const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const TaxItemSchema  = new Schema(
   {
      productId: {
         type: Schema.Types.ObjectId,
         ref: 'Products',
         required: true 
      },
      piece: Number,
      unit: String,
      unitPrice:{
         type:Number,
         set:function(data){
            return data * 100;
         },
         get:function(data){
            return data / 100;
         }
           
      },
      taxPercent: Number
   }
)

const offerSchema = new Schema({
   companytitleId:{
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true 
   },
   title:{
    type:String,
    set:function(data){
      return data.replace(/(^|\s)\S/g, l => l.toUpperCase());
   },
   },
   offerDate:{
    type:Date,
    required:true,
    default:Date.now
   },
   billDate:{
      type:Date,
      required:true,
      default:Date.now
   },
   currencyPrice:{
      type:Number,
      default:null,
      set:function(data){
         return data * 10000;
      },
      get:function(data){
         return data / 10000;
      }
   },

   items:[TaxItemSchema],
   currency:{
      type:String,
      required:true

   },
   totalPrice:{
      required:true,
      type:Number,
      set:function(data){
         return data * 100;
      },
      get:function(data){
         return data / 100;
      }
   },
   offerCondition:String,
   createBill:{
      type:Boolean,
      default:false
   },
   payment:{
      type:Number,
      default:0,
      set:function(data){
         return data * 100;
      },
      get:function(data){
         return data / 100;
      }
   },
   unpaid:{
      type:Number,
      set:function(data){
         return data * 10000;
      },
      get:function(data){
         return data / 10000;
      }
   },
   paymentDate:{
      type:Date,
      default:null
   }
},
   {toObject:{getters:true}});

module.exports = Offer = mongoose.model("Offer", offerSchema);