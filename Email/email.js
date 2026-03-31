import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken"
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
export default async function sendEmail(email, subject, text, type) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: "sara29ghali@gmail.com",
      pass: "pguc ezzp wnqj wxll", // gmail --> application --> password 
    },
  });

  // Send an email using async/await
  let htmlContent;

  if (type === "register") {
    const emailToken = jwt.sign({ email }, "myEmail"); 
    htmlContent = template(emailToken);
  } 

  const info = await transporter.sendMail({
    from: '"Hello and welcome" <sara29ghali@gmail.com>',
    to: email,
    subject,
    text, // Plain-text version of the message
    html: htmlContent, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}



