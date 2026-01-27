// import modules
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
// import routes
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = ENV.PORT || 5000;

// middleware
app.use(cookieParser());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "5mb" }));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
    
   if (ENV.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname,"../frontend","dist")));

      app.get("*", (_,res)=>{
         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
      })
   }
   
server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
  connectDB();
});
