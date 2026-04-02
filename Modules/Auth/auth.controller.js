import { userModel } from "../../DataBase/Models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendEmail from "../../Email/email.js";
import { handleError } from "../../Middleware/HandlError.js";


const register = handleError(async (req, res) => {
    const registerdUser = await userModel.insertMany(req.body);
    sendEmail(req.body.email,"Hello", " Thank you for registering with us! Please verify your account", "register");
    registerdUser[0].password = undefined;
    res.status(201).json({ message: "Registered User", data: registerdUser })
})


const login = handleError(async (req, res) => {
    let checkPassword = bcrypt.compareSync(req.body.password, req.user.password)
    if (!checkPassword) {
        return res.status(422).json({ message: "invalid Data" });
    }

    if (req.user.isVerified == false) {
        return res.status(400).json({ message: "Account is not verified" });
    }
    let token = jwt.sign({ _id: req.user._id, email: req.user.email, role: req.user.role }, "iti")
    res.status(200).json({ message: "Login User", data: req.user, token: token })

})

const verifyAccount = handleError(async (req, res) => {
    jwt.verify(req.params.email, "iti-node-js-project", async (err, decoaded) => {
        if (err) {
            return res.status(400).json({ message: "invalid token" })
        }
        await userModel.findOneAndUpdate({ email: decoaded }, { isVerified: true })
        res.send("Account is verified")
    })

})
export { register, login, verifyAccount }