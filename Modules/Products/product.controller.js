import { productModel } from "../../DataBase/Models/product.model.js";
import { handleError } from "../../Middleware/HandlError.js";



// Get all products with search, filter
export const getAllProducts = handleError(async (req, res) => {
    const { search, category, minPrice, maxPrice } = req.query;

    let query = {};

    // Search by name
    if (search) {
        //query operators :flexible string searching
        query.name = {
            $regex: search, // includes the search string anywhere in the name
            $options: 'i' // i for insensitive-case
        };
    }

    // Filter by category
    if (category) {
        query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Keep only active products
    query.isActive = true;

    let productsQuery = productModel.find(query).populate('category', 'name image');

    const products = await productsQuery;

    res.status(200).json({ message: "Products retrieved successfully", count: products.length, products });

});

// Get product by ID
export const getProductById = handleError(async (req, res) => {
    const product = await productModel.findById(req.params.id).populate('category', 'name').populate('seller', 'name email');
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product retrieved successfully", product });
});