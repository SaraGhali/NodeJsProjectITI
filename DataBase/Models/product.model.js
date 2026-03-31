
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },
        ratings: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });

export const productModel = mongoose.model("Product", productSchema);
