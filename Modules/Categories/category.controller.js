import { categoryModel } from "../../DataBase/Models/category.model.js";


// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ message: "Categories retrieved successfully", categories });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category retrieved successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving category", error: error.message });
    }
};