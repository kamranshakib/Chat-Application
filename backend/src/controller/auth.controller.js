import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/utils.js";
 
export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({
        message: "All fields are required!",
        
      });

    // cheak paaword is least then 6
    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be at least then 6 characters",
      });
    }

    // cheak email is valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // cheak email is exist or no
    const findUser = await User.findOne({ email });
    if (findUser)
      return res.status(400).json({ message: "email already exist" });

    const user = new User({
      fullName,
      email,
      password,
      profilePic,
    }); 

    if (user) {
      generateToken(user._id, res);
      await user.save();
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error registaring User",
      err: error.message,
    });
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
