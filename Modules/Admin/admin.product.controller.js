import { productModel } from "../../DataBase/Models/product.model.js";
import { handleError } from "../../Middleware/HandlError.js";

// ===================== PRODUCT MANAGEMENT =====================

// Get all products (admin view, including inactive)
export const adminGetAllProducts = handleError(async (req, res) => {
    const products = await productModel.find().populate("category", "name");
    res.status(200).json({ message: "All products", count: products.length, data: products });
});

// soft delete product
export const adminToggleProductStatus = handleError(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    product.isActive = !product.isActive;
    await product.save();
    const status = product.isActive ? "activated" : "deactivated";
    res.status(200).json({ message: `Product has been ${status}`, data: product });
});

// Update product
export const adminUpdateProduct = handleError(async (req, res) => {
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
});

// Delete product
export const adminDeleteProduct = handleError(async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
});

// Add product
export const adminAddProduct = handleError(async (req, res) => {
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

});