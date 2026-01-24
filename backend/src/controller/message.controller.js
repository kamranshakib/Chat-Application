import User from "../models/User.js";
import Message from "../models/Message.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllChats = (req, res) => {
  res.send("get all chats");
};
export const getMessageByUserId = (req, res) => {
  res.send("get message by user id");
};
export const sendMessage = (req, res) => {
  res.send("send message");
};
