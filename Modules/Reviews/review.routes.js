import express from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "./review.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";
import { allowedTo } from "../../Middleware/allowedTo.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/review", verifyToken, allowedTo("user"), addReview);
reviewRoutes.get("/review/product/:productId", getProductReviews);
reviewRoutes.put("/review/:id", verifyToken, allowedTo("user"), updateReview);
reviewRoutes.delete("/review/:id", verifyToken, allowedTo("user"), deleteReview);

export default reviewRoutes;
