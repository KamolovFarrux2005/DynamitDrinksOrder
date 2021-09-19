const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
    ProductId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }],
    AgentId:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Agent'
    }],
    QTY:{
        type: String
    },
    location:{
        type: String
    }
});

module.exports = mongoose.model("Order", orderModel)