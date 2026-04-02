import { userModel } from "../../DataBase/Models/user.model.js";
import { handleError } from "../../Middleware/HandlError.js";

// Get all users (active and inactive)
export const getAllUsers = handleError(async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json({ message: "All users", count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Approve / Restrict user (toggle isActive) — Soft Delete approach
export const toggleUserStatus = handleError(async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isActive = !user.isActive;
        await user.save();
        const status = user.isActive ? "approved (active)" : "restricted (soft deleted)";
        res.status(200).json({ message: `User has been ${status}`, data: user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// delete a user 
export const deleteUser = handleError(async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User has been deleted", data: user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Change user role (e.g., promote to seller or admin)
export const changeUserRole = handleError(async (req, res) => {
    try {
        const { role } = req.body;
        const allowedRoles = ["customer", "seller", "admin"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role. Allowed roles: ${allowedRoles.join(', ')}` });
        }
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: `User role updated to '${role}'`, data: user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
