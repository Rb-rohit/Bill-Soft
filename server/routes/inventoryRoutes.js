const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getLowStockProducts } = require("../controllers/inventoryController");
const router = express.Router();


router.get("/low-stock", authMiddleware, getLowStockProducts);

module.exports = router;