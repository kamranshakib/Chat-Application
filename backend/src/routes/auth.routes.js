import express from "express"
const Router = express.Router();


Router.get("/signup",(req,res)=>{
    res.send("sign up route")
})

Router.get("/login",(req,res)=>{
    res.send("login  route")
})

Router.get("/logout",(req,res)=>{
    res.send("sign up route")
})
export default Router;