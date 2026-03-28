import express from "express";
import { getAllUsers, updateUser, deleteUser } from "./user.controller.js";
import { verifyToken } from "../../Middleware/verifyToken.js";
const userRouter = express.Router();

// userRouter.get("/users", getAllUsers);
userRouter.put("/users/:id", verifyToken, updateUser);
userRouter.delete("/users/:id", verifyToken, deleteUser);

export default userRouter;