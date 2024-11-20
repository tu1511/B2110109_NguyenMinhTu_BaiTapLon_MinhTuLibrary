import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import bookRoutes from "./routes/book.route.js";
import inventoryRoutes from "./routes/inventory.route.js";
import borrowRoutes from "./routes/borrowTransaction.route.js";

dotenv.config({ path: `${process.cwd()}/.env` });
// app config
const app = express();
const port = process.env.PORT || 5000;
const apiVersion = process.env.API_VERSION || "v1";

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// db config
connectDB();

// api routes
app.get(`/api/${apiVersion}/`, (req, res) => {
  res.send("Hello World!");
});

//api routes
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/category`, categoryRoutes);
app.use(`/api/${apiVersion}/books`, bookRoutes);
app.use(`/api/${apiVersion}/inventory`, inventoryRoutes);
app.use(`/api/${apiVersion}/borrow`, borrowRoutes);

// listen
app.listen(port, () => {
  console.log(`Server is running on localhost http://localhost:${port}`);
});
