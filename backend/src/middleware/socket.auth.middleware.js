import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.log("No token provided in cookies");
      return next(new Error("Authentication error: No token provided"));
    }

    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Invalid token");
      return next(new Error("Authentication error: Invalid token"));
    }
    // Fetch user from database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("User not found");
      return next(new Error("Authentication error: User not found"));
    }
    // Attach user to socket object
    socket.user = user;
    socket.userId = user._id.toString();
    console.log(`Socket authenticated: ${user.fullName} (${user._id})`);
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Authentication error"));
  }
};
