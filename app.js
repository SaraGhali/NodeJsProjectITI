import express from 'express';
import { connection } from './DataBase/DBconnection.js';


const app = express();
connection; // Establish the database connection
app.use(express.json()); // Middleware to parse JSON bodies

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});