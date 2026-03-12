const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDashboardStats, getPaymentReport } = require("../controllers/dashboardController");
const router = express.Router();


router.get("/stats", authMiddleware, getDashboardStats);
router.get("/payment-report", authMiddleware, getPaymentReport);

module.exports = router;