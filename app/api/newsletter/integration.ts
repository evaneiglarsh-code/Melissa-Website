import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const origin = "https://www.mcthemedium.com";
export const adminPath = "/api/newsletter/constant-contact/setup";
export const callbackPath = "/api/newsletter/constant-contact/callback";
export const callback = origin + callbackPath;
export const listName = "Website emails";
export const cookieName = "__Host-mc-newsletter-oauth";
const oauth = "https://authz.constantcontact.com/oauth2/default/v1";
const api = "https://api.cc.email/v3";
const key = "mc:newsletter:oauth:v1";
const lock = key + ":lock";
export const noStore = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };

type Session = { access: string; refresh: string; expires: number; list: string; generation: string; published: boolean };
type TokenResponse = { access_token: string; refresh_token: string; expires_in: number };

export function configured() {
  return Boolean(process.env.CONSTANT_CONTACT_CLIENT_ID && process.env.CONSTANT_CONTACT_CLIENT_SECRET
    && (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)
    && (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN));
}

export function canonical(req: Request) { return new URL(req.url).origin === origin; }
export function sameOrigin(req: Request) { return canonical(req) && req.headers.get("origin") === origin; }
export function randomKey() { return randomBytes(32).toString("base64url"); }
export function equal(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export async function redis<T>(...command: (string | number)[]): Promise<T> {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw Error("Redis not configured");
  const res = await fetch(url, {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(command), cache: "no-store", redirect: "error", signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw Error("Redis unavailable");
  const data = await res.json() as { result: T; error?: string };
  if (data.error || !("result" in data)) throw Error("Redis command failed");
  return data.result;
}

function encryptionKey() {
  const secret = process.env.CONSTANT_CONTACT_CLIENT_SECRET;
  if (!secret) throw Error("Missing encryption key");
  return createHmac("sha256", secret).update("mc-newsletter:redis-token-encryption:v1").digest();
}
export async function getSession(): Promise<Session | null> {
  const encrypted = await redis<string | null>("GET", key);
  if (!encrypted) return null;
  const bytes = Buffer.from(encrypted, "base64");
  const decrypt = createDecipheriv("aes-256-gcm", encryptionKey(), bytes.subarray(0, 12));
  decrypt.setAuthTag(bytes.subarray(12, 28));
  return JSON.parse(Buffer.concat([decrypt.update(bytes.subarray(28)), decrypt.final()]).toString()) as Session;
}
async function saveSession(session: Session) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(session)), cipher.final()]);
  await redis("SET", key, Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64"));
}
async function withLock<T>(fn: () => Promise<T>) {
  const id = randomKey();
  if (await redis("SET", lock, id, "NX", "EX", 60) !== "OK") throw Error("Newsletter operation already in progress");
  try { return await fn(); } finally {
    try {
      await redis("EVAL", "if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0", 1, lock, id);
    } catch { console.error("Newsletter lock cleanup deferred to expiry"); }
  }
}

export async function limit(kind: string, value: string, max: number, seconds: number) {
  const secret = process.env.CONSTANT_CONTACT_CLIENT_SECRET;
  if (!secret) throw Error("Missing rate limit key");
  const hash = createHmac("sha256", secret).update(value).digest("hex");
  const count = await redis<number>("EVAL", "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return n", 1, key + ":rate:" + kind + ":" + hash, seconds);
  return count <= max;
}
export function clientIp(req: Request) { return req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown"; }
export function validEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function authorizeUrl(state: string) {
  const url = new URL(oauth + "/authorize");
  url.search = new URLSearchParams({
    client_id: process.env.CONSTANT_CONTACT_CLIENT_ID!, redirect_uri: callback,
    response_type: "code", scope: "contact_data offline_access", state,
  }).toString();
  return url;
}
async function exchange(params: Record<string, string>): Promise<TokenResponse> {
  const credentials = Buffer.from(process.env.CONSTANT_CONTACT_CLIENT_ID + ":" + process.env.CONSTANT_CONTACT_CLIENT_SECRET).toString("base64");
  const res = await fetch(oauth + "/token", {
    method: "POST", headers: { Authorization: "Basic " + credentials, "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams(params), cache: "no-store", redirect: "error", signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) throw Error("Constant Contact authorization failed");
  const data = await res.json() as TokenResponse;
  if (!data.access_token || !data.refresh_token || !Number.isFinite(data.expires_in)) throw Error("Incomplete token response");
  return data;
}

function useTokens(tokens: TokenResponse) {
  return { access: tokens.access_token, refresh: tokens.refresh_token, expires: Date.now() + tokens.expires_in * 1000 };
}
async function apiFetch(access: string, path: string, body?: object) {
  return fetch(api + path, {
    method: body ? "POST" : "GET", headers: { Authorization: "Bearer " + access, Accept: "application/json", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined, cache: "no-store", redirect: "error", signal: AbortSignal.timeout(5000),
  });
}

export async function finishAuthorization(code: string) {
  return withLock(async () => {
    const tokens = useTokens(await exchange({ grant_type: "authorization_code", code, redirect_uri: callback }));
    const res = await apiFetch(tokens.access, "/contact_lists?status=active&limit=1000&include_count=true");
    if (!res.ok) throw Error("Could not read contact lists");
    const data = await res.json() as { lists: { list_id: string; name: string; dynamic_filtered_list?: boolean }[]; lists_count?: number };
    if ((data.lists_count ?? 0) > data.lists.length) throw Error("Too many lists to verify");
    const matches = data.lists.filter((entry) => entry.name === listName && !entry.dynamic_filtered_list);
    if (matches.length !== 1 || !matches[0].list_id) return false;
    await saveSession({ ...tokens, list: matches[0].list_id, generation: randomKey(), published: false });
    return true;
  });
}

async function currentSession() {
  const saved = await getSession();
  if (!saved || saved.expires > Date.now() + 60_000) return saved;
  return withLock(async () => {
    const current = await getSession();
    if (!current || current.expires > Date.now() + 60_000) return current;
    const tokens = await exchange({ grant_type: "refresh_token", refresh_token: current.refresh });
    const updated = { ...current, ...useTokens(tokens) };
    await saveSession(updated);
    return updated;
  });
}

export async function subscribe(email: string, test = false) {
  const session = await currentSession();
  if (!session || (!test && !session.published)) return "unavailable";
  const lookup = await apiFetch(session.access, "/contacts?" + new URLSearchParams({ email, status: "all" }));
  if (!lookup.ok) throw Error("Could not check existing consent");
  const data = await lookup.json() as { contacts: { email_address?: { permission_to_send?: string } }[] };
  if (!Array.isArray(data.contacts)) throw Error("Invalid contacts response");
  // Never re-enable mail for previously unsubscribed or suppressed recipients.
  if (data.contacts.some((contact) => !["explicit", "implicit", "not_set"].includes(contact.email_address?.permission_to_send ?? ""))) return "protected";
  const response = await apiFetch(session.access, "/contacts/sign_up_form", { email_address: email, list_memberships: [session.list] });
  if (!response.ok) throw Error("Constant Contact did not accept signup");
  if (test) await redis("SET", key + ":tested:" + session.generation, "1", "EX", 86_400);
  return "accepted";
}

export async function publish() {
  return withLock(async () => {
    const session = await getSession();
    if (!session) return false;
    if (session.published) return true;
    if (!await redis("GET", key + ":tested:" + session.generation)) return false;
    await saveSession({ ...session, published: true });
    return true;
  });
}
