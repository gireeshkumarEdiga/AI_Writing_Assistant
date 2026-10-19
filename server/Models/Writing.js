const mongoose = require("mongoose");

const writingSchema = new mongoose.Schema({

    task : {
        type : String,
        enum : ["generate","rewrite","summarize"],
        required : true
    },
    title : {
        task : String,
        default : "Untitled Writing"
    },
    inputText : {
        type : String,
        required : true
    },
    tone : {
        type : String,
        default : "Professional"
    },
    result : {
        type : String,
        required : true
    }

}, { timestamps : true });

module.exports = module.module("Writing",writingSchema);