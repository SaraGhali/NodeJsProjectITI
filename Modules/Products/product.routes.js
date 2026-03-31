import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./product.controller.js";

const productRoutes = express.Router();

productRoutes.get("/product", getAllProducts);
productRoutes.get("/product/:id", getProductById);
// productRoutes.post("/product", addProduct);
// productRoutes.put("/product/:id", updateProduct);
// productRoutes.delete("/product/:id", deleteProduct);

export default productRoutes;
