
import bcrypt from "bcrypt"


const hashPassword = async (req,res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 8)
    next()
}

export default hashPassword