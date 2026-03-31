import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
    type:mongoose.Types.ObjectId,
    ref:"user"
    },

    items:[
        {
            product:{
            type:mongoose.Types.ObjectId,
            ref:"product"
            },
            quantity:Number,
            price:Number
        }
    ],

    totalPrice:Number,

    paymentMethod:{
        type:String,
        enum:["Credit Card","PayPal","Cash on Delivery","Wallet"]
    },

    status:{
        type:String,
        enum:["pending","confirmed","shipped","delivered"],
        default:"pending"
    }
},{timestamps:true})

export const orderModel = mongoose.model("order",orderSchema)