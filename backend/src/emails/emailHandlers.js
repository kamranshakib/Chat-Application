import { resendClint,Sender      } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"

export const sendWelcomeEmail = async (email, name , cliendURl) =>{
    const {data, error} = await resendClint.emails.send({
        from: `${Sender.name} <${Sender.email}>`,
        to: email,
        subject: "Welcome to Chatify",
        html: createWelcomeEmailTemplate(name, cliendURl)
    })
    if(error){
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email")
    }

    console.log("Welcome Email sent successfully", data)
}