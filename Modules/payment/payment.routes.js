import express from "express";
import { createPayment, createPaymentWithSavedCard } from "./payment.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/basic/:orderId", verifyToken, createPayment);

paymentRouter.post("/save-card/:orderId", verifyToken, createPaymentWithSavedCard);

export default paymentRouter;