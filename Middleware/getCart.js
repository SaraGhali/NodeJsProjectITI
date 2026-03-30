import { cartModel } from "../DataBase/Models/cart.model.js";

const getCart = async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.decoded._id });
    req.cart = cart;
    next();
}

export default getCart;