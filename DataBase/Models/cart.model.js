import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    items:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type: Number,
                default: 1
            },
            price:Number
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
},
{ timestamps: true }
);

export const cartModel = mongoose.model("Cart", cartSchema);