import express from "express";
import {getUserOrders, trackOrder } from "./order.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";

const orderRouter = express.Router();
orderRouter.use(verifyToken);
orderRouter.get("/track/:orderId",trackOrder);
orderRouter.get("/my-orders", getUserOrders);
export default orderRouter;