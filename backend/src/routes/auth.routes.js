import express from "express";
const Router = express.Router();
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import User from "../models/User.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

Router.use(arcjetProtection);

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);
Router.put("/update-profile", protectRoute, updateProfile);
Router.get("/cheak", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

// for testing sender email
Router.get("/delete-email", async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All emails deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
export default Router;
