import { canonical, clientIp, configured, getSession, limit, noStore, sameOrigin, subscribe, validEmail } from "./integration";

export const maxDuration = 35;

export async function GET(req: Request) {
  let enabled = false;
  if (canonical(req) && configured()) {
    try { enabled = (await getSession())?.published === true; }
    catch { console.error("Newsletter availability check failed"); }
  }
  return Response.json({ enabled }, { headers: noStore });
}

export async function POST(req: Request) {
  const reply = (status: number) => Response.json({ ok: status === 200 }, { status, headers: noStore });
  if (!sameOrigin(req)) return reply(403);
  if (!configured()) return reply(503);
  if (!req.headers.get("content-type")?.startsWith("application/json")) return reply(415);
  let body;
  try { body = await req.json(); } catch { return reply(400); }
  if (!body || !validEmail(body.email) || body.consent !== true) return reply(400);
  try {
    if (!(await getSession())?.published) return reply(503);
    const email = body.email.toLowerCase();
    if (!await limit("public-ip", clientIp(req), 8, 600) || !await limit("public-email", email, 3, 3600)) return reply(429);
    const result = await subscribe(email);
    return reply(result === "unavailable" ? 503 : 200);
  } catch {
    console.error("Newsletter signup failed");
    return reply(503);
  }
}
