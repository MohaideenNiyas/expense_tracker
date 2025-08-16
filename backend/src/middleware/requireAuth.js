import { verifyIdToken } from "../services/firebase.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) return res.status(401).json({ message: "Missing Authorization Bearer token" });

    const decoded = await verifyIdToken(match[1]);
    req.user = { uid: decoded.uid, email: decoded.email || null };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
