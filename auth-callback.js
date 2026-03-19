import express from "express";
import { exchangeCode } from "./token.js";
import { saveSession } from "./session.js";
import { ENV } from "./env.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { code, state, error } = req.query;

  if (error) return res.redirect(`${ENV.FRONTEND_URL}?error=${error}`);

  if (!code || !state || state !== req.session.state) {
    return res.redirect(`${ENV.FRONTEND_URL}?error=invalid_state`);
  }

  try {
    const tokenData = await exchangeCode({
      code,
      codeVerifier: req.session.codeVerifier,
    });

    if (!tokenData.access_token) {
      return res.redirect(`${ENV.FRONTEND_URL}?error=token_failed`);
    }

    delete req.session.codeVerifier;
    delete req.session.state;

    saveSession(req, tokenData);
    res.redirect(`${ENV.FRONTEND_URL}?login=success`);

  } catch (err) {
    console.error("Callback error:", err.message);
    res.redirect(`${ENV.FRONTEND_URL}?error=server_error`);
  }
});

export default router;
