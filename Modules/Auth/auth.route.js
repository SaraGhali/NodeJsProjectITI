import express from "express";
import { register, login, verifyAccount } from "./auth.controller.js";
import CheckEmail from "../../Middleware/CheckEmail.js";
import CheckPhone from "../../Middleware/CheckPhone.js";
import { validation } from "../../Middleware/Validation.js";
import registerValidation from "../../Validations/registerValidation.js";
import loginValidation from "../../Validations/loginValidation.js";
import HashPassword from "../../Middleware/HashPassword.js";
const authRouter = express.Router();

const checkLoginIdentity = (req, res, next) => {
    if (req.body.email) {
        return CheckEmail(req, res, next);
    } else if (req.body.phone) {
        return CheckPhone(req, res, next);
    } else {
        return res.status(400).json({ message: "Please provide either email or phone" });
    }
};

authRouter.post("/register", validation(registerValidation), CheckEmail, CheckPhone, HashPassword, register);
authRouter.post("/login", validation(loginValidation), checkLoginIdentity, login);
authRouter.get("/verify/:email", verifyAccount);

export default authRouter;