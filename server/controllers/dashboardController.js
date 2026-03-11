const Sale = require("../models/Sale");
const mongoose = require("mongoose");



// get/api/dashboard/stats
exports.getDashboardStats = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todaySales = await Sale.aggregate([
            {
                $match: {
                    createAt: { $gte: todayStart, $lte: todayEnd }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$grandTotal" },
                    totalBills: { $sum: 1 }
                }
            }
        ]);

        //monthly sale chart
        const monthlySales = await Sale.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    revenue: { $sum: "$grandTotal" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        //daily sale (last 7 days)
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const dailySales = await Sale.aggregate([
            {
                $match: {
                    createAt: { $gte: last7Days }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" },
                    revenue: { $sum: "$grandTotal" }
                }
            },
            { $sort: { _id: 1} }
        ]);

        res.json({
            today: todaySales[0] || { totalRevenue: 0, totalBills: 0 },
            monthlySales,
            dailySales
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};