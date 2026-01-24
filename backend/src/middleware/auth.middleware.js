import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; 
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Protected Middleware Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
