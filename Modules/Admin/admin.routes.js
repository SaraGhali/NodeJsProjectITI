import express from "express";
import { verifyToken } from "../../Middleware/verifyToken.js";
import { allowedTo } from "../../Middleware/allowedTo.js";

// User Management
import { getAllUsers, toggleUserStatus, deleteUser, changeUserRole } from "./admin.user.controller.js";
// Product & Category Management
import { adminGetAllProducts, toggleProductStatus, adminDeleteProduct, adminGetAllCategories, toggleCategoryStatus, adminDeleteCategory } from "./admin.product.controller.js";
// Order & Shipping Management
import { adminGetAllOrders, adminGetOrderById, updateOrderStatus } from "./admin.order.controller.js";

const adminRouter = express.Router();

// Apply auth + admin-only guard to ALL admin routes
// adminRouter.use(verifyToken, allowedTo("admin"));

adminRouter.get("/admin/users", getAllUsers);
adminRouter.patch("/admin/users/:id/status", toggleUserStatus);
adminRouter.delete("/admin/users/:id", deleteUser);
adminRouter.patch("/admin/users/:id/role", changeUserRole);

// ============ Product Management Routes ============

adminRouter.get("/admin/products", adminGetAllProducts);
adminRouter.patch("/admin/products/:id/status", toggleProductStatus);
adminRouter.delete("/admin/products/:id", adminDeleteProduct);

// ============ Category Management Routes ============

adminRouter.get("/admin/categories", adminGetAllCategories);
adminRouter.patch("/admin/categories/:id/status", toggleCategoryStatus);
adminRouter.delete("/admin/categories/:id", adminDeleteCategory);

// ============ Order & Shipping Management Routes ============

adminRouter.get("/admin/orders", adminGetAllOrders);
adminRouter.get("/admin/orders/:orderId", adminGetOrderById);
adminRouter.patch("/admin/orders/:orderId/status", updateOrderStatus);

export default adminRouter;
