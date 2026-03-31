import express from "express";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/category", getAllCategories);
categoryRoutes.get("/category/:id", getCategoryById);
// categoryRoutes.post("/category", addCategory);
// categoryRoutes.put("/category/:id", updateCategory);
// categoryRoutes.delete("/category/:id", deleteCategory);

export default categoryRoutes;
