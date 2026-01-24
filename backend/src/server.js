// import modules
import express from "express"
import dotenv from "dotenv"
import path from "path"
import {connectDB} from "./lib/db.js"
import { ENV } from "./lib/env.js"
import cookieParser from "cookie-parser"


// import routes
import authRoute from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"

dotenv.config() 

const app = express();
const PORT = ENV.PORT || 5000
const __dirname = path.resolve();

// middleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)
 

// conneted with frontend

// if(ENV.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")))

//     app.use("*",(_,res)=>{
//         res.sendFile(__dirname, "/frontend","index.html")
//     })
// }


 app.listen(PORT,() =>{
    console.log(`Server listen on port ${PORT}`)
    connectDB();
 }) 
    