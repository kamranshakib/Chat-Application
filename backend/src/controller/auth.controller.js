import User from "../models/User.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

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
      // before CR;
      // generateToken(user._id, res);
      // await user.save();
      // after CR
      const savedUser = await user.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });

      // todo: send a welcome email to user
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL,
        );
      } catch (error) {
        console.error("Failed to send welcome email: ", error);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error registaring User",
      err: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if  (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
