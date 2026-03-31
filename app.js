import express from 'express';
import { connection } from './DataBase/DBconnection.js';
import userRouter from './Modules/Users/user.route.js';
import authRouter from './Modules/Auth/auth.route.js';
import cartRouter from './Modules/Cart/cart.routes.js';
import categoryRouter from './Modules/Categories/category.routes.js';
import productRouter from './Modules/Products/product.routes.js';
import reviewRouter from './Modules/Reviews/review.routes.js';
import orderRouter from './Modules/Order/order.routes.js';
import adminRouter from './Modules/Admin/admin.routes.js';

const app = express();
connection; // Establish the database connection
app.use(express.json()); // Middleware to parse JSON bodies
// app.use(userRouter);
app.use(authRouter);

app.use(cartRouter);
app.use(orderRouter);

app.use(categoryRouter);
app.use(productRouter);
app.use(reviewRouter);
app.use(orderRouter);
app.use(adminRouter);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});