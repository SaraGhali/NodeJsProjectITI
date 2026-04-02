import { userModel } from "../../DataBase/Models/user.model.js";
import { productModel } from "../../DataBase/Models/product.model.js";
import { orderModel } from "../../DataBase/Models/order.model.js";
import { handleError } from "../../Middleware/HandlError.js";

// ===================== PROFILE =====================

// Update store profile (storeName, address, etc.)
export const updateStoreProfile = handleError(async (req, res) => {
    // Only allow safe fields to be updated here
    const { storeName, address, phone } = req.body;
    const updated = await userModel.findByIdAndUpdate(
        req.decoded._id,
        { storeName, address, phone },
        { new: true }
    ).select("-password");

    res.status(200).json({ message: "Store profile updated", data: updated });
});

// ===================== PRODUCTS =====================

// Add a product — seller field is automatically set from the token
export const addSellerProduct = handleError(async (req, res) => {
    const product = await productModel.create({
        ...req.body,
        seller: req.decoded._id, // always taken from JWT, never from body
    });
    res.status(201).json({ message: "Product created successfully", data: product });
});

// Get all products belonging to the logged-in seller
export const getSellerProducts = handleError(async (req, res) => {
    const products = await productModel
        .find({ seller: req.decoded._id })
        .populate("category", "name");
    res.status(200).json({ message: "My products", count: products.length, data: products });
});

// Update own product — with ownership check
export const updateSellerProduct = handleError(async (req, res) => {
    const product = await productModel.findOne({
        _id: req.params.id,
        seller: req.decoded._id,
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found or you do not own this product" });
    }

    // Prevent seller from changing the seller field
    delete req.body.seller;

    const updated = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Product updated", data: updated });
});

// Delete own product — with ownership check
export const deleteSellerProduct = handleError(async (req, res) => {
    const product = await productModel.findOneAndDelete({
        _id: req.params.id,
        seller: req.decoded._id,
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found or you do not own this product" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
});

// ===================== ORDERS =====================

// Get orders that contain at least one product belonging to this seller
export const getSellerOrders = handleError(async (req, res) => {
    // Find all products owned by this seller
    const myProducts = await productModel
        .find({ seller: req.decoded._id })
        .select("_id");
    const myProductIds = myProducts.map((p) => p._id);

    // Find orders where any item's product is in the seller's product list
    const orders = await orderModel
        .find({ "items.product": { $in: myProductIds } })
        .populate("user", "name email")
        .populate("items.product", "name price");

    res.status(200).json({ message: "My orders", count: orders.length, data: orders });
});

// ===================== EARNINGS =====================

// Get the logged-in seller's current earnings
export const getSellerEarnings = handleError(async (req, res) => {
    const seller = await userModel
        .findById(req.decoded._id)
        .select("name storeName earnings");

    res.status(200).json({ message: "Earnings summary", data: seller });
});