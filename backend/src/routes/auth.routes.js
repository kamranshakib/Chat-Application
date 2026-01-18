import express from "express";
const Router = express.Router();
import { login, logout, signup } from "../controller/auth.controller.js";

Router.post("/signup", signup);

Router.get("/login", login);

Router.get("/logout", logout);

export default Router;
