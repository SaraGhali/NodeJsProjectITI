import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    let token = req.headers.token
    jwt.verify(token, "iti", async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "invalid token" })
        } else {
            req.decoded = decoded
            next();
        }
    })
}