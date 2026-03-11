const Product = require("../models/Product");

//cerate product
exports.createProduct = async (req, res) => {

    try {
        const product = await Product.create({
            ...req.body,
            createBy: req.user.userId
        });

        res.status(201).json({
            message: "Product create successfully",
            product
        });

    }catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// get all products
exports.getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const total = await Product.countDocuments();

        const products = await Product.find({ isActive: true})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1});

        res.json({
            products,
            total,
            page,
            pages: Math.ceil(total / limit)
        });

    }catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    }catch(error) {
        res.status(500).json({message: error.message});
    }
};

// update product
exports.updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({
            message: "Produuct updated",
            product
        });

    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

// delete product 
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            isActive: false
        });

        res.json({
            message: "Product deleted"
        });

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// product search (for billing)
exports.searchProducts = async (req, res) => {
    try{
        const keyword = req.query.q;

        const products = await Product.find({
            isActive:true,
            $or: [
                { name: { $regex: keyword, $options: "i" }},
                { barcode: {$regex: keyword, $options: "i"}}
            ]
        }).limit(10);

        res.json(products);

    }catch (error) {
        res.status(500).json({message:error.message});
    }
};