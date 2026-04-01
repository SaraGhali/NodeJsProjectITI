import express from "express";
import { verifyToken } from "../../Middleware/verifyToken.js";
import { allowedTo } from "../../Middleware/allowedTo.js";
import {
    updateStoreProfile,
    addSellerProduct,
    getSellerProducts,
    updateSellerProduct,
    deleteSellerProduct,
    getSellerOrders,
    getSellerEarnings,
} from "../Seller/seller.controller.js";

const sellerRouter = express.Router();

// Apply auth + seller-only guard to ALL seller routes
sellerRouter.use(verifyToken, allowedTo("seller"));


sellerRouter.patch("/seller/profile", updateStoreProfile);


sellerRouter.post("/seller/products", addSellerProduct);
sellerRouter.get("/seller/products", getSellerProducts);
sellerRouter.put("/seller/products/:id", updateSellerProduct);
sellerRouter.delete("/seller/products/:id", deleteSellerProduct);


sellerRouter.get("/seller/orders", getSellerOrders);


sellerRouter.get("/seller/earnings", getSellerEarnings);

export default sellerRouter;