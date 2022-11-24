const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const customerSchema = new Schema({
    companytitle:{
     type:String,
     required:true,
     set:function(data){
        return data.replace(/(^|\s)\S/g, l => l.toUpperCase());
     },
    },
    name:{
        type:String,
        required:true,
        set:function(data){
            return data.replace(/(^|\s)\S/g, l => l.toUpperCase());
         },
    },
    surname:{
        type:String,
        required:true,
        set:function(data){
            return data.replace(/(^|\s)\S/g, l => l.toUpperCase());
         },
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    taxAdministration:String,
    taxNumber:String,
    address:{
        type:String,
        set:function(data){
            return data.replace(/(^|\s)\S/g, l => l.toUpperCase());
         },
    },
    fixedDiscount:Number,
    startBalance:Number,
    faxNo:Number
 });
 
 module.exports = Customer = mongoose.model("Customer", customerSchema);