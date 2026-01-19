import express from "express";
const Router = express.Router();
import { login, logout, signup } from "../controller/auth.controller.js";
import User from "../models/User.js";

Router.post("/signup", signup);

Router.get("/login", login);

Router.get("/logout", logout);

// for testing sender email
Router.get("/delete-email", async (req,res)=>{
    try {
        const result =  await User.deleteMany({}) 
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
})
export default Router;
