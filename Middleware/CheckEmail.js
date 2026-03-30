import { userModel } from "../DataBase/Models/user.model.js";


const CheckEmail = async (req, res, next) => {
    if (!req.body.email) return next();

    let foundedUser = await userModel.findOne({email: req.body.email})

    // console.log(req.url);
    if( req.url == "/register"){
        if(foundedUser){
            return res.status(400).json({message: "email already exists"})
        }
        next()
    }else{
        if(foundedUser){
            req.user = foundedUser
             next() 
        }else{
             return res.status(422).json({message: "invalid Data"})
        }
    } 
}

export default CheckEmail