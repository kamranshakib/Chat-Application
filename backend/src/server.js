import express from "express"
import dotenv from "dotenv"
import path from "path"


import authRoute from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)


if(process.env.NODE_ENv = "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.use("*",(req,res)=>{
        res.sendFile(__dirname, "/frontend","index.html")
    })
}

 app.listen(PORT,()=> console.log(`Server listen on ${PORT}`)) 