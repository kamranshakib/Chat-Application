import express from "express";
import {
  getAllContacts,
  getAllChats,
  getMessageByUserId,
  sendMessage,
} from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const Router = express.Router();

Router.get("/contacts",protectRoute, getAllContacts);
Router.get("/chats", getAllChats);
Router.get("/:id", getMessageByUserId);
Router.post("/send/:id", sendMessage);

export default Router;
