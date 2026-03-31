import { categoryModel } from "../../DataBase/Models/category.model.js";

// Add category
export const addCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        let existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({ message: "Category already exists" });
        }

        let category = await categoryModel.create({ name, description, image });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error adding category", error: error.message });
    }
};

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

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, description, image },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
