import { productModel } from "../../DataBase/Models/product.model.js";



// Get all products with search, filter
export const getAllProducts = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).populate('category', 'name').populate('seller', 'name email');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};