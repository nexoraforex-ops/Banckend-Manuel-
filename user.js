import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ logged: false });
  }

  const { accessToken } = req.session.user;

  try {
    const r = await fetch("https://api.derivws.com/trading/v1/options/accounts", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!r.ok) return res.status(401).json({ logged: false, error: "Token inválido" });

    const data = await r.json();
    res.json({ logged: true, accessToken, accounts: data });

  } catch (err) {
    res.status(500).json({ error: "Erro ao ligar à Deriv" });
  }
});

export default router;
