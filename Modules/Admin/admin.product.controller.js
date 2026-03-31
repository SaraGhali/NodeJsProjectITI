import { productModel } from "../../DataBase/Models/product.model.js";

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

// soft delete product
export const adminToggleProductStatus = async (req, res) => {
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

// Update product
export const adminUpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await productModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete product
export const adminDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

// Add product
export const adminAddProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, stock, seller } = req.body;

        let product = await productModel.create({
            name,
            description,
            price,
            category,
            images,
            stock,
            seller
        });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};