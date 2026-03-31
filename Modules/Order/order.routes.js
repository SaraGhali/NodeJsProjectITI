import express from "express";
import {trackOrder } from "./order.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";

const orderRouter = express.Router();
orderRouter.use(verifyToken);
orderRouter.get("/track/:orderId",trackOrder);

export default orderRouter;