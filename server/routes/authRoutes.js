const express = require("express");
const router = express.Router();
const { register, getMe, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");



router.post("/register", register);
router.post("/login", login);
router.get("/me",authMiddleware, getMe);



module.exports = router;