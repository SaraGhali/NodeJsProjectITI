import express from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "./review.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/review", verifyToken, addReview);
reviewRoutes.get("/review/product/:productId", getProductReviews);
reviewRoutes.put("/review/:id", verifyToken, updateReview);
reviewRoutes.delete("/review/:id", verifyToken, deleteReview);

export default reviewRoutes;
