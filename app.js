import express from "express";
import session from "express-session";
import cors from "cors";

import { ENV } from "./env.js";
import authStart    from "./auth-start.js";
import authCallback from "./auth-callback.js";
import logout       from "./logout.js";
import userRoute    from "./user.js";

const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true,
}));

app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure:   ENV.NODE_ENV === "production",
    httpOnly: true,
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge:   24 * 60 * 60 * 1000,
  },
}));

app.use(express.json());

app.use("/auth/start",    authStart);
app.use("/auth/callback", authCallback);
app.use("/auth/logout",   logout);
app.use("/api/user",      userRoute);

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.get("/",       (_, res) => res.send("NEXORA BACKEND RUNNING 🔥"));

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server: http://localhost:${ENV.PORT}`);
});
