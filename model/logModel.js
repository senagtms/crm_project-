const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const LogSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
         required: true 
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Log",LogSchema);