import { userModel } from "../DataBase/Models/user.model.js";

const CheckPhone = async (req, res, next) => {
    if (!req.body.phone) return next();

    let foundedUser = await userModel.findOne({ phone: req.body.phone });

    if (req.url === "/register") {
        if (foundedUser) {
            return res.status(400).json({ message: "phone already exists" });
        }
        next();
    } else {
        if (!req.user && foundedUser) {
            req.user = foundedUser;
            next();
        } else if (req.user) {
            // Already found user via email check, or we don't interfere
            next();
        } else {
            return res.status(422).json({ message: "invalid Data" });
        }
    }
};

export default CheckPhone;
