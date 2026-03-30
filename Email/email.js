import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken"
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
export default async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: "sara29ghali@gmail.com",
      pass: "pguc ezzp wnqj wxll", // gmail --> application --> password 
    },
  });

  // Send an email using async/await
  let emailToken = jwt.sign(email, "iti-node-js-project")

  const info = await transporter.sendMail({
    from: '"Hello and welcome" <sara29ghali@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: template(emailToken), // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}