import { NextResponse } from "next/server";
import { adminPath, authorizeUrl, canonical, clientIp, configured, cookieName, equal, getSession, limit, noStore, publish, randomKey, redis, sameOrigin, subscribe, validEmail } from "../../integration";

export const maxDuration = 35;

function setupKey() {
  const key = process.env.NEWSLETTER_SETUP_KEY;
  return key && key.length >= 24 ? key : null;
}

const notices: Record<string, string> = {
  connected: "Connected to Website emails. Test the form with an email you control, then verify the contact in Constant Contact before publishing.",
  "missing-list": "Could not find one active, writable list named Website emails. Check the Constant Contact account and list name.",
  failed: "Connection failed. Check the app settings and try again from this page.",
  expired: "Approval expired or did not match this browser. Start again from this page.",
};

function page(req: Request, message: string, status = 200) {
  if (!canonical(req)) return new Response("Not found", { status: 404, headers: noStore });
  const form = configured() && setupKey() ? `
    <form method="post" action="${adminPath}">
      <p><label>Setup key <input name="setupKey" type="password" required maxlength="256" autocomplete="off"></label></p>
      <p><button name="action" value="connect">Authorize Constant Contact</button></p>
      <p><label>Test email <input name="email" type="email" maxlength="254" autocomplete="off"></label></p>
      <p>Use only an email address you control. Testing opts that address into Melissa Cubillas’s email updates.</p>
      <p><button name="action" value="test">Send test signup</button></p>
      <p><button name="action" value="publish">Publish signup form</button></p>
    </form>` : "<p>The required Production settings are not available in this deployment yet.</p>";
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Newsletter setup</title></head><body><main><h1>Melissa’s newsletter setup</h1><p>${message}</p>${form}</main></body></html>`, {
    status, headers: { ...noStore, "Referrer-Policy": "same-origin", "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex", "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'" },
  });
}

export function GET(req: Request) {
  const status = new URL(req.url).searchParams.get("status");
  const message = status && Object.hasOwn(notices, status) ? notices[status] : "Authorize, send a test signup, then publish.";
  return page(req, message);
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return page(req, "Request not allowed.", 403);
  const key = setupKey();
  if (!key || !configured()) return page(req, "Setup is not configured.", 503);
  try {
    if (!await limit("setup", clientIp(req), 12, 600)) return page(req, "Too many attempts. Please try again later.", 429);
    const fields = await req.formData();
    const provided = fields.get("setupKey");
    if (typeof provided !== "string" || !equal(provided, key)) return page(req, "Incorrect setup key.", 403);
    switch (fields.get("action")) {
      case "connect": {
        const state = randomKey();
        await redis("SET", "mc:newsletter:state:" + state, "1", "EX", 600);
        const response = NextResponse.redirect(authorizeUrl(state), { status: 303, headers: noStore });
        response.cookies.set({ name: cookieName, value: state, path: "/", maxAge: 600, secure: true, httpOnly: true, sameSite: "lax" });
        return response;
      }
      case "test": {
        const email = fields.get("email");
        if (!validEmail(email)) return page(req, "Enter an email address you control.", 400);
        if (!await getSession()) return page(req, "Authorize Constant Contact first.", 409);
        const result = await subscribe(email.toLowerCase(), true);
        return result === "accepted"
          ? page(req, "Test accepted. Verify the email appears under Website emails in Constant Contact, then use Publish signup form.")
          : page(req, "This email could not be used for the test. Try a fresh email address you control.", 409);
      }
      case "publish":
        return await publish()
          ? page(req, "The signup form is now enabled. Open the homepage in a new tab to verify it.")
          : page(req, "Complete a successful test signup before publishing.", 409);
      default:
        return page(req, "Choose a setup action.", 400);
    }
  } catch {
    console.error("Newsletter setup action failed");
    return page(req, "Setup could not finish. Check the project settings and try again.", 503);
  }
}
