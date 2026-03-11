const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/",authMiddleware, saleController.createSale);

router.get("/today/report", saleController.getTodaySales);
router.get("/invoice/:id", saleController.downloadInvoice);

router.get("/", saleController.getAllSales);
router.get("/:id", saleController.getSaleById);

module.exports = router;