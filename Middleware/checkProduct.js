import { productModel } from "../DataBase/Models/product.model.js";

const checkProduct = async (req, res, next) => {
    let product = await productModel.findById(req.body.productId);
    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    req.product = product;
    next();
}

export default checkProduct;