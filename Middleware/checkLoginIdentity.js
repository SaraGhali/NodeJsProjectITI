import CheckEmail from "./CheckEmail.js";
import CheckPhone from "./CheckPhone.js";

function checkLoginIdentity(req, res, next) {
    if (req.body.email) {
        return CheckEmail(req, res, next);
    } else if (req.body.phone) {
        return CheckPhone(req, res, next);
    } else {
        return res.status(400).json({ message: "Please provide either email or phone" });
    }
}

export default checkLoginIdentity;
