import express from "express";
import connectDB from "./src/db/index.js";
import todoRoutes from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cookieParser()); 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/api', todoRoutes);

app.get('/', (req, res) => {
    res.send(`Server listening on the port http://localhost:${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
