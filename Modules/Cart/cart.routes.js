import express from "express";
import checkProduct from "../../Middleware/checkProduct.js";
import getCart from "../../Middleware/getCart.js";
import {addToCart, removeFromCart, updateQuantity, checkout} from "./cart.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";

const cartRouter = express.Router();
cartRouter.use(verifyToken)
cartRouter.post("/cart", checkProduct, getCart, addToCart);


export default cartRouter;