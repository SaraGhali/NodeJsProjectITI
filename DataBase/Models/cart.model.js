import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type: Number,
                default:1,
                min:1
            },
            price:Number
        }
    ],
    totalPrice: {
        type: Number,
        default: 0,
    }
},
{ timestamps: true }
);

export const cartModel = mongoose.model("Cart", cartSchema);