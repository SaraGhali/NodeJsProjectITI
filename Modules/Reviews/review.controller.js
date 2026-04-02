import { reviewModel } from "../../DataBase/Models/review.model.js";
import { productModel } from "../../DataBase/Models/product.model.js";
import { handleError } from "../../Middleware/HandlError.js";

// Add review
export const addReview = handleError(async (req, res) => {
    const { product, rating, comment } = req.body;
    const user = req.decoded._id;

    // 1. Check if product exists
    const existingProduct = await productModel.findById(product);
    if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    // 2. Add review
    const review = await reviewModel.create({
        user,
        product,
        rating,
        comment
    });

    // 3. Update the product's ratings average and count
    const reviews = await reviewModel.find({ product });
    const ratingCount = reviews.length;
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating = ratingCount > 0 ? (totalRating / ratingCount) : 0;

    await productModel.findByIdAndUpdate(product, {
        ratings: {
            average: Number(averageRating.toFixed(1)),
            count: ratingCount
        }
    });

    res.status(201).json({ message: "Review added successfully", review });
});

// Get reviews for a specific product
export const getProductReviews = handleError(async (req, res) => {
    const { productId } = req.params;
    const reviews = await reviewModel.find({ product: productId })
        .populate('user', 'name'); // Assume user has a name field
    res.status(200).json({ message: "Reviews retrieved", count: reviews.length, reviews });
});

// Update review
export const updateReview = handleError(async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await reviewModel.findByIdAndUpdate(
        id,
        { rating, comment },
        { new: true, runValidators: true }
    );

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    // Update product average rating
    const reviews = await reviewModel.find({ product: review.product });
    const ratingCount = reviews.length;
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating = ratingCount > 0 ? (totalRating / ratingCount) : 0;

    await productModel.findByIdAndUpdate(review.product, {
        ratings: {
            average: Number(averageRating.toFixed(1)),
            count: ratingCount
        }
    });

    res.status(200).json({ message: "Review updated successfully", review });
});

// Delete review
export const deleteReview = handleError(async (req, res) => {
    const { id } = req.params;

    const review = await reviewModel.findByIdAndDelete(id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    // Update product average rating
    const reviews = await reviewModel.find({ product: review.product });
    const ratingCount = reviews.length;
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating = ratingCount > 0 ? (totalRating / ratingCount) : 0;

    await productModel.findByIdAndUpdate(review.product, {
        ratings: {
            average: Number(averageRating.toFixed(1)),
            count: ratingCount
        }
    });

    res.status(200).json({ message: "Review deleted successfully", review });
});
