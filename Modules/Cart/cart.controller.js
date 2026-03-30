import { cartModel } from "../../DataBase/Models/cart.model";

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
        cart = carts[0]
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

        cart = await cartModel.findByIdAndUpdate(cart._id,{items: cart.items,totalPrice},{ new: true })
    }
    res.json({message: "product added",Cart:cart})
}

// get cart items
export const getCartItems = async(req,res)=>{
    let cart = req.cart
    if(!cart){
        return res.json({message:"cart is empty"})
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
    res.json({message:"item removed",cart})
}

// update quantity of item in cart
export const updateQuantity = async(req,res)=>{
    let cart = req.cart;

    let item = cart.items.find(i => i.product.toString() === req.params.productId)
    if(!item){
        return res.json({message:"product not in cart"})
    }

    item.quantity = req.body.quantity;
    cart.totalPrice = cart.items.reduce((acc,item)=>{
        return acc + item.price * item.quantity
    },0)

    await cart.save()
    res.json({message:"quantity updated",cart})
}