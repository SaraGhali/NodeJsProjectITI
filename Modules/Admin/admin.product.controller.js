import { productModel } from "../../DataBase/Models/product.model.js";
import { categoryModel } from "../../DataBase/Models/category.model.js";

// ===================== PRODUCT MANAGEMENT =====================

// Get all products (admin view, including inactive)
export const adminGetAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate("category", "name");
        res.status(200).json({ message: "All products", count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Toggle product active status
export const toggleProductStatus = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.isActive = !product.isActive;
        await product.save();
        const status = product.isActive ? "activated" : "deactivated";
        res.status(200).json({ message: `Product has been ${status}`, data: product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Admin force-delete a product
export const adminDeleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product permanently deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===================== CATEGORY MANAGEMENT =====================

// Get all categories (admin view)
export const adminGetAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ message: "All categories", count: categories.length, data: categories });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Toggle category active status
export const toggleCategoryStatus = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.isActive = !category.isActive;
        await category.save();
        const status = category.isActive ? "activated" : "deactivated";
        res.status(200).json({ message: `Category has been ${status}`, data: category });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Admin force-delete a category
export const adminDeleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category permanently deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
