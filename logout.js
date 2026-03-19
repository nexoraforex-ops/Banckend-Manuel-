import express from "express";
import { clearSession } from "./session.js";
import { ENV } from "./env.js";

const router = express.Router();

router.get("/", (req, res) => {
  clearSession(req);
  res.redirect(ENV.FRONTEND_URL);
});

export default router;
