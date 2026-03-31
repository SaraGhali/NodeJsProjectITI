import express from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "./review.controller.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/review", addReview);
reviewRoutes.get("/review/product/:productId", getProductReviews);
reviewRoutes.put("/review/:id", updateReview);
reviewRoutes.delete("/review/:id", deleteReview);

export default reviewRoutes;
