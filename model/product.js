const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String
})

module.exports = mongoose.model("Product", productSchema)