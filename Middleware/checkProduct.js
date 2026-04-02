import { productModel } from "../DataBase/Models/product.model.js";

const checkProduct = async (req, res, next) => {
    let product = await productModel.findById(req.body.productId);
    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    if (!product.isActive) {
        return res.status(400).json({ message: "product is not available" });
    }
    const quantity = req.body.quantity || 1;
    if (quantity > product.stock) {
        return res.status(400).json({ message: "not enough stock available" });
    }
    req.product = product;
    req.quantity = quantity;
    next();
}

export default checkProduct;