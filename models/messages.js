const mongoose = require('mongoose');

const mssgSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

const mssgModel = mongoose.model('Messages',mssgSchema);
module.exports=mssgModel;