const express = require("express");
const router = express.Router();

const client = require("../configs/redis");

const Product = require("../models/products.model");

router.get("", async(req,res) => {
    try{
        // getting products from database
        const products = await Product.find().lean().exec();

    }
    

})

router.post("", async(req,res) => {
    try{
        const product = await Product.create(req.body);
        
        // getting updated product list from backend to add to redis
        const products = await Product.find().lean().exec();
        // setting key value pair in redis
        client.set("products", JSON.stringify(products));

        return res.status(201).send(product);
    } catch(err) {
        return res.status(500).send(err);
    }
})