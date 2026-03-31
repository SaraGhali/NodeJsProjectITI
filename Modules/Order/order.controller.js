import { orderModel } from "../../DataBase/Models/order.model.js";
// Order Tracking
export const trackOrder = async (req,res)=>{
    let order = await orderModel.findById(req.params.orderId).populate("items.product","name price");

    if(!order){
        return res.status(404).json({message:"order not found"});
    }

    res.status(200).json({orderStatus: order.status,orderDetails: order});
}
