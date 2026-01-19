import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (id, res) => {
  const {JWT_SECRET} = ENV;
  if(!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  const token = jwt.sign({ id }, JWT_SECRET,
    { expiresIn: "7d" });

   res.cookie("jwt",token,{
    maxAge:  7 * 24 * 60 * 60  * 1000, // Seven day
    httpOnly: true, // prevent XSS attack 
    sameSite: "strict" // prevent CSRF attacks
   })  
   
   return token

};
