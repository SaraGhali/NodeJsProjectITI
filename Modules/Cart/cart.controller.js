import { cartModel } from "../../DataBase/Models/cart.model.js";
import { orderModel } from "../../DataBase/Models/order.model.js";
import { productModel } from "../../DataBase/Models/product.model.js";
import sendEmail from "../../Email/email.js";
import { handleError } from "../../Middleware/HandlError.js";

export const addToCart = handleError(async (req, res) => {
    let cart = req.cart;
    let product = req.product;
    let quantity = req.quantity;

    if (!cart) {
        cart = await cartModel.create({
            user: req.decoded._id,
            items: [{
                product: product._id,
                quantity,
                price: product.price
            }],
            totalPrice: product.price * quantity
        });

        return res.status(201).json({ message: "product added", cart });
    } else {
        let item = cart.items.find(i => i.product.toString() === product._id.toString())
        if (item) {
            if (item.quantity + quantity > product.stock) {
                return res.status(400).json({ message: "not enough stock available" });
            }
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

        cart = await cartModel.findByIdAndUpdate(cart._id, { items: cart.items, totalPrice }, { new: true });
    }
    res.status(200).json({ message: "product added", Cart: cart });
})

// get cart items
export const getCartItems = handleError(async (req, res) => {
    let cart = req.cart
    if (!cart || cart.items.length === 0) {
        return res.status(404).json({ message: "cart is empty" })
    }

    res.json({ message: "user cart", cart })
})

// remove item from cart
export const removeFromCart = handleError(async (req, res) => {
    let cart = req.cart;
    if (!cart || cart.items.length === 0) {
        return res.status(404).json({ message: "cart is empty" })
    }
    let item = cart.items.find(i => i.product.toString() === req.params.productId)
    if (!item) {
        return res.status(404).json({ message: "product not in cart" })
    }
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId)
    cart.totalPrice = cart.items.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)
    await cart.save()
    res.status(200).json({ message: "item removed", cart })
})

// update quantity of item in cart
export const updateQuantity = handleError(async (req, res) => {
    let cart = req.cart;

    let item = cart.items.find(i => i.product.toString() === req.params.productId)
    if (!item) {
        return res.status(404).json({ message: "product not in cart" });
    }

    if(req.body.quantity < 1){
        return res.status(400).json({message:"quantity must be greater than 0"})
    }
    await cart.populate({path: 'items.product',select: 'name stock price'});
    if (req.body.quantity > item.product.stock) {
        return res.status(400).json({ message: "not enough stock available" });
    }
    item.quantity = req.body.quantity;
    cart.totalPrice = cart.items.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

    await cart.save();
    res.status(200).json({ message: "quantity updated", cart });
})

// checkout
export const checkout = handleError(async (req, res) => {
    let cart = req.cart;
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "cart is empty" });
    }
    await cart.populate('items.product');
    for (let item of cart.items) {
        if (item.quantity > item.product.stock) {
            return res.status(400).json({ 
                message: `Not enough stock for product ${item.product.name}` 
            });
        }
    }

    let order = await orderModel.create({
        user: req.decoded._id,
        items: cart.items,
        totalPrice: cart.totalPrice,
        paymentMethod: req.body.paymentMethod,
        status: "pending"
    })
    
    for (let item of cart.items) {
        await productModel.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    sendEmail(
        req.decoded.email,
        "Order Confirmation",
        `Your order has been placed successfully. 
        order details: ${order._id} with total price ${order.totalPrice}.
        Thank you for shopping with us!`,
        "order"
    );
    order = await orderModel.findById(order._id).populate({ path: 'items.product', select: 'name price images' });
    res.status(201).json({ message: "order summary", order });
})