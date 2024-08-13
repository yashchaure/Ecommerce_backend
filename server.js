import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import path from "path";
// import bodyParser from 'body-parser'

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//other middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productsRoute from "./routes/product.route.js";
import uploadRoutes from "./routes/upload.route.js";
import orderRoutes from "./routes/order.route.js";

// Routes Middleware
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productsRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => {
  connectDB();
  console.log(`server connected sussefully on port ${port}`);
});
