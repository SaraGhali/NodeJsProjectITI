import { cartModel } from "../../DataBase/Models/cart.model.js";
import { orderModel } from "../../DataBase/Models/order.model.js";

export const addToCart = async (req, res) => {
    let cart = req.cart;
    let product = req.product;
    let quantity = req.body.quantity;

    if (!cart) {
        const carts = await cartModel.insertMany([{
        user:req.decoded._id,
        items: [{
            product: product._id,
            quantity,
            price: product.price
        }],
        totalPrice: product.price * quantity
        }])
        cart = carts[0];
        return res.status(201).json({message: "product added",cart});
    } else {
        let item = cart.items.find(i => i.product.toString() === product._id.toString())
        if (item) {
            item.quantity += quantity
        } else {
            cart.items.push({
            product: product._id,
            quantity,
            price: product.price
            })
        }

        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.price * item.quantity
        }, 0)

        cart = await cartModel.findByIdAndUpdate(cart._id,{items: cart.items,totalPrice},{ new: true });
    }
    res.status(200).json({message: "product added",Cart:cart});
}

// get cart items
export const getCartItems = async(req,res)=>{
    let cart = req.cart
    if(!cart){
        return res.status(404).json({message:"cart is empty"})
    }

    res.json({message:"user cart", cart})
}

// remove item from cart
export const removeFromCart = async(req,res)=>{
    let cart = req.cart;
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId)
    cart.totalPrice = cart.items.reduce((acc,item)=>{
        return acc + item.price * item.quantity
    },0)
    await cart.save()
    res.status(200).json({message:"item removed",cart})
}

// update quantity of item in cart
export const updateQuantity = async(req,res)=>{
    let cart = req.cart;

    let item = cart.items.find(i => i.product.toString() === req.params.productId)
    if(!item){
        return res.status(404).json({message:"product not in cart"});
    }

    item.quantity = req.body.quantity;
    cart.totalPrice = cart.items.reduce((acc,item)=>{
        return acc + item.price * item.quantity
    },0)

    await cart.save();
    res.status(200).json({message:"quantity updated",cart});
}

// checkout
export const checkout = async(req,res)=>{
    let cart = req.cart;
    if(!cart){
        return res.status(400).json({message:"cart is empty"});
    }

    let order = await orderModel.create({
        user: req.decoded._id,
        items: cart.items,
        totalPrice: cart.totalPrice,
        paymentMethod: req.body.paymentMethod,
        status: "pending"
    })
    

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    sendEmail(
        req.body.email, 
        "Order Confirmation",
        `Your order has been placed successfully. 
        order details: ${order._id} with total price ${order.totalPrice}.
        Thank you for shopping with us!`,
        "order"
    );

    res.status(201).json({message:"order summary", order});
}