import express from "express"
const Router = express.Router();


Router.get("/send",(req,res)=>{
    res.send("imput send messages")
})

export default Router;