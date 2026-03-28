import express from 'express';
import { connection } from './DataBase/DBconnection.js';
import userRouter from './Modules/Users/user.route.js';
import authRouter from './Modules/Auth/auth.route.js';


const app = express();
connection; // Establish the database connection
app.use(express.json()); // Middleware to parse JSON bodies
app.use(userRouter);
app.use(authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});