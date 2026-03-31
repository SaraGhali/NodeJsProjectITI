import { orderModel } from "../../DataBase/Models/order.model.js";

// Get all orders (all users)
export const adminGetAllOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate("user", "name email")
            .populate("items.product", "name price");
        res.status(200).json({ message: "All orders", count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single order by ID
export const adminGetOrderById = async (req, res) => {
    try {
        const order = await orderModel
            .findById(req.params.orderId)
            .populate("user", "name email phone")
            .populate("items.product", "name price");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order details", data: order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update order status (pending -> confirmed -> shipped -> delivered -> cancelled)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Allowed: ${allowedStatuses.join(', ')}` });
        }
        const order = await orderModel.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        ).populate("user", "name email");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: `Order status updated to '${status}'`, data: order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
