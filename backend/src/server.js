import express from "express"
import dotenv from "dotenv"


import authRoute from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000

app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)

 app.listen(PORT,()=> console.log(`Server listen on ${PORT}`)) 