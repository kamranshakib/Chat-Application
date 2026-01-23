import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      } else if (decision.reason.isBot()) {  
        return res.status(403).json({ error: "Access denied for bots" });
      } else {
        return res.status(403).json({ error: "Access denied" });
      }
    }

    // check spoofed bot check
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Access denied for spoofed bots" });
    }
    next();
  } catch (error) {
    console.error("Arcjet Protection Middleware Error:", error);
    next(error)
  }
};
