import express from "express";
import crypto from "crypto";
import { generatePKCE } from "./pkce.js";
import { ENV } from "./env.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = crypto.randomBytes(16).toString("hex");

  req.session.codeVerifier = codeVerifier;
  req.session.state        = state;

  const url = "https://auth.deriv.com/oauth2/auth?" +
    new URLSearchParams({
      response_type:         "code",
      client_id:             ENV.APP_ID,
      redirect_uri:          ENV.REDIRECT_URI,
      scope:                 "trade",
      state,
      code_challenge:        codeChallenge,
      code_challenge_method: "S256",
    });

  res.redirect(url);
});

export default router;
