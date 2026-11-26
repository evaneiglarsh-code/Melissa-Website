import { NextRequest, NextResponse } from "next/server";
import { adminPath, canonical, configured, cookieName, equal, finishAuthorization, noStore, origin, redis } from "../../integration";

export const maxDuration = 35;

export async function GET(req: NextRequest) {
  if (!canonical(req) || !configured()) return new Response("Not found", { status: 404, headers: noStore });
  const done = (status: string) => {
    const url = new URL(adminPath, origin);
    url.searchParams.set("status", status);
    const response = NextResponse.redirect(url, { status: 303, headers: noStore });
    response.cookies.set({ name: cookieName, value: "", path: "/", maxAge: 0, secure: true, httpOnly: true, sameSite: "lax" });
    return response;
  };
  const state = req.nextUrl.searchParams.get("state");
  const code = req.nextUrl.searchParams.get("code");
  const cookie = req.cookies.get(cookieName)?.value;
  if (!code || !state || !cookie || !equal(state, cookie)) return done("expired");
  try {
    if (!await redis("GETDEL", "mc:newsletter:state:" + state)) return done("expired");
    return done(await finishAuthorization(code) ? "connected" : "missing-list");
  } catch {
    console.error("Newsletter OAuth callback failed");
    return done("failed");
  }
}
