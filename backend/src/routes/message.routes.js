import express from "express";
import {
  getAllContacts,
  getAllChats,
  getMessageByUserId, 
  sendMessage,
} from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const Router = express.Router();
  
Router.use(arcjetProtection, protectRoute);
Router.get("/contacts", getAllContacts);
Router.get("/chats", getAllChats);
Router.get("/:id", getMessageByUserId);
Router.post("/send/:id", sendMessage);
export default Router;
