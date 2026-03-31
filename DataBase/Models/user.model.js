import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },

    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["customer", "seller", "admin"],
        default: "customer"
    },
    address: {
        type: String,
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "visa"],
        default: "cash"
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
    // Seller-specific fields
    storeName: {
        type: String,
        trim: true,
    },
    earnings: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, // created at, updated at
    versionKey: false // hide __v

})

// create model 
export const userModel = mongoose.model("User", userSchema);



