import { orderModel } from "../../DataBase/Models/order.model.js";
// Order Tracking
export const trackOrder = async (req,res)=>{
    let order = await orderModel.findById(req.params.orderId).populate("items.product","name price");

    if(!order){
        return res.status(404).json({message:"order not found"});
    }

    res.status(200).json({orderStatus: order.status,orderDetails: order});
}

// Get User Orders
export const getUserOrders = async (req, res) => {
    let orders = await orderModel.find({ user: req.decoded._id }).populate("items.product", "name price images");
    if (!orders.length) {
        return res.status(200).json({ message: "No orders found" });
    }
    res.status(200).json({message: "user orders",orders:orders});
    console.log(req.decoded._id);
};