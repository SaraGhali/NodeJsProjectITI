import { productModel } from "../../DataBase/Models/product.model.js";

// Add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, stock, seller } = req.body;

        let product = await productModel.create({
            name,
            description,
            price,
            category,
            images,
            stock,
            seller // In a real app, this might come from req.user._id
        });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

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

// Update product
export const updateProduct = async (req, res) => {
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
export const deleteProduct = async (req, res) => {
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
