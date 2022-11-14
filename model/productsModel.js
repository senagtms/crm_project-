const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type:String,
        required:true,
        set:function(data){
            return data.replace(/(^|\s)\S/g, l => l.toUpperCase());
         },
    },
    amountStock:{
        type:String,
        required:true
    },
    unitPrice:{
        type:Number,
        get:priceGetter,
        set:priceSetter,
        required:true,
    },
    purchasePrice:{
        get:priceGetter,
        set:priceSetter,
        type:Number
    },
    salesPrice:{
        get:priceGetter,
        set:priceSetter,
        type:Number,
    }
 });
 
function priceSetter(data){
    return data * 100;
}

function priceGetter(data){
    return data / 100;
}

 module.exports = Products = mongoose.model("Products", productSchema);