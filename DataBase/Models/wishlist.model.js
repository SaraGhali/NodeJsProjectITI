import mongoose from "mongoose";
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}, {
    timestamps: true,
    versionKey: false
})
export const wishlistModel = mongoose.model("Wishlist", wishlistSchema);