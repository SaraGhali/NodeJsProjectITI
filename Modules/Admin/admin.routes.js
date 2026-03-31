import express from "express";
import { verifyToken } from "../../Middleware/verifyToken.js";
import { allowedTo } from "../../Middleware/allowedTo.js";

// User Management
import { getAllUsers, toggleUserStatus, softDeleteUser, changeUserRole } from "./admin.user.controller.js";
// Product & Category Management
import { adminGetAllProducts, toggleProductStatus, adminDeleteProduct, adminGetAllCategories, toggleCategoryStatus, adminDeleteCategory } from "./admin.product.controller.js";
// Order & Shipping Management
import { adminGetAllOrders, adminGetOrderById, updateOrderStatus } from "./admin.order.controller.js";

const adminRouter = express.Router();

// Apply auth + admin-only guard to ALL admin routes
adminRouter.use(verifyToken, allowedTo("admin"));

// ============ User Management Routes ============
// GET    /admin/users              → list all users
// PATCH  /admin/users/:id/status  → toggle isActive (approve / restrict)
// DELETE /admin/users/:id         → soft delete (set isActive: false)
// PATCH  /admin/users/:id/role    → change user role
adminRouter.get("/admin/users", getAllUsers);
adminRouter.patch("/admin/users/:id/status", toggleUserStatus);
adminRouter.delete("/admin/users/:id", softDeleteUser);
adminRouter.patch("/admin/users/:id/role", changeUserRole);

// ============ Product Management Routes ============
// GET    /admin/products              → list all products
// PATCH  /admin/products/:id/status  → toggle isActive
// DELETE /admin/products/:id         → force delete
adminRouter.get("/admin/products", adminGetAllProducts);
adminRouter.patch("/admin/products/:id/status", toggleProductStatus);
adminRouter.delete("/admin/products/:id", adminDeleteProduct);

// ============ Category Management Routes ============
// GET    /admin/categories              → list all categories
// PATCH  /admin/categories/:id/status  → toggle isActive
// DELETE /admin/categories/:id         → force delete
adminRouter.get("/admin/categories", adminGetAllCategories);
adminRouter.patch("/admin/categories/:id/status", toggleCategoryStatus);
adminRouter.delete("/admin/categories/:id", adminDeleteCategory);

// ============ Order & Shipping Management Routes ============
// GET   /admin/orders              → list all orders
// GET   /admin/orders/:orderId     → get single order
// PATCH /admin/orders/:orderId/status → update order status
adminRouter.get("/admin/orders", adminGetAllOrders);
adminRouter.get("/admin/orders/:orderId", adminGetOrderById);
adminRouter.patch("/admin/orders/:orderId/status", updateOrderStatus);

export default adminRouter;
