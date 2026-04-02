import { categoryModel } from "../../DataBase/Models/category.model.js";
import { handleError } from "../../Middleware/HandlError.js";

// ===================== CATEGORY MANAGEMENT =====================

// Get all categories (admin view)
export const adminGetAllCategories = handleError(async (req, res) => {
    const categories = await categoryModel.find();
    res.status(200).json({ message: "All categories", count: categories.length, data: categories });
});

// soft delete category
export const adminToggleCategoryStatus = handleError(async (req, res) => {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    category.isActive = !category.isActive;
    await category.save();
    const status = category.isActive ? "activated" : "deactivated";
    res.status(200).json({ message: `Category has been ${status}`, data: category });
});

// Add category
export const adminAddCategory = handleError(async (req, res) => {
    const { name, description, image } = req.body;

    let existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
        return res.status(409).json({ message: "Category already exists" });
    }

    let category = await categoryModel.create({ name, description, image });
    res.status(201).json({ message: "Category created successfully", category });
});

// Update category
export const adminUpdateCategory = handleError(async (req, res) => {
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
});

// Delete category
export const adminDeleteCategory = handleError(async (req, res) => {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", category });
});
