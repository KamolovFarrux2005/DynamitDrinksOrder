const mongoose = require("mongoose");

const Agentmodel = mongoose.Schema({
    agentName: String,
    agentNumber: String
});

module.exports = mongoose.model("Agent", Agentmodel);