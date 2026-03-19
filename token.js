import fetch from "node-fetch";
import { ENV } from "./env.js";

export async function exchangeCode({ code, codeVerifier }) {
  const res = await fetch("https://auth.deriv.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "authorization_code",
      client_id:     ENV.APP_ID,
      code,
      code_verifier: codeVerifier,
      redirect_uri:  ENV.REDIRECT_URI,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || "Token exchange failed");
  return data;
}
