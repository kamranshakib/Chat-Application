import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const signup = async (req, res) => {
  const { fullName, email, password,profilePic } = req.body;
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

    const user = await User.create({
      fullName,
      email,
      password,
      profilePic,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registaring User",
      err: error.message,
    });
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
