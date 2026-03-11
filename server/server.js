const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/Db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");


dotenv.config();

const app = express();

// middleware 
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials:true }));

//Rouutes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);


connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
