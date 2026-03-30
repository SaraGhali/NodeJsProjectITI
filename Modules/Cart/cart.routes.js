import express from "express";
import checkProduct from "../../Middleware/checkProduct.js";
import getCart from "../../Middleware/getCart.js";
import {addToCart, removeFromCart, updateQuantity, checkout, getCartItems} from "./cart.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";

const cartRouter = express.Router();
cartRouter.use(verifyToken)
cartRouter.post("/cart", checkProduct, getCart, addToCart);
cartRouter.use(getCart);
cartRouter.get("/cart", getCartItems);
cartRouter.delete("/cart/:productId", removeFromCart);
cartRouter.put("/cart/:productId", updateQuantity);
cartRouter.post("/checkout", checkout);

export default cartRouter;