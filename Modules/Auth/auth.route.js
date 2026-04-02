import express from "express";
import { register, login, verifyAccount } from "./auth.controller.js";
import CheckEmail from "../../Middleware/CheckEmail.js";
import CheckPhone from "../../Middleware/CheckPhone.js";
import { validation } from "../../Middleware/Validation.js";
import registerValidation from "../../Validations/registerValidation.js";
import loginValidation from "../../Validations/loginValidation.js";
import HashPassword from "../../Middleware/HashPassword.js";
import checkLoginIdentity from "../../Middleware/checkLoginIdentity.js";
const authRouter = express.Router();

authRouter.post("/register", validation(registerValidation), CheckEmail, CheckPhone, HashPassword, register);
authRouter.post("/login", validation(loginValidation), checkLoginIdentity, login);
authRouter.get("/verify/:email", verifyAccount);

export default authRouter;