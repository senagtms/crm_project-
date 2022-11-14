const mongoose = require('mongoose')
const Offer = require("../model/offerModel")
const Customer = require("../model/customerModel")
const Products = require("../model/productsModel")
const {totalItemPrice,totaltrPrice} = require('../helpers/calculatePrice');
const axios = require("axios");
const moment = require("moment");
const OfferController={
    
    async newOffer(req,res){
        const company = await Customer.find({}, 'companytitle _id')
        let products = await Products.find({}, 'productName _id')
        res.render("offer/newOffer",{url:req.projectUrl,companyData:company,productsData:products, error:false})
    
    },

    async createOffer(req,res,next){
        try {
            let error = null;
           /*  if(!req.body.offerDate || !req.body.piece || !req.body.unit || !req.body.unitPrice || !req.body.taxProduct){
                error = 'Lütfen Yıldızlı Alanları Doldurun'
            }
            if(error){
                return res.json({error});
              } */

              let itemsList = [];
              let totalPrice = 0;
              for(let i = 0; i<req.body.productId.length ; i++){
    
                itemsList.push({
                    productId: req.body.productId[i],
                    piece: req.body.piece[i],
                    unit: req.body.unit[i],
                    unitPrice:req.body.unitPrice[i],
                    taxPercent: req.body.taxPercent[i]
                });
                totalPrice += totalItemPrice(parseFloat(req.body.piece[i]),parseFloat(req.body.unitPrice[i]),parseFloat(req.body.taxPercent[i]));
                
              }
              const trPrice = await  axios.get('https://api.genelpara.com/embed/doviz.json')
              const totaltrPrice_ = totalPrice * trPrice.data["USD"].satis;
              
  
              const offer = new Offer({
                title: req.body.title,
                companytitleId: req.body.companytitleId,
                offerDate:req.body.offerDate,
                offerCondition:req.body.offerCondition,
                currency:req.body.currency,
                items: itemsList,
                totalPrice: totalPrice.toFixed(2),
                unpaid: totaltrPrice_.toFixed(4)
        
              })


              const newoffer = await offer.save(); 
                res.json({succes:1, newoffer}) 
            
        } catch (error) {
            return res.json({error:error.message})
            
        }
    },
    async list(req,res,next){
        try {
            
            const listOffer = await Offer.find({},"title offerDate currency totalPrice");
            res.render('offer',{url:req.projectUrl,data:listOffer})
        } catch (error) {
            return next(error)
        }
    },
    async createBill(req,res){

        try {
            
            const offerId = req.params.id;
            const offerDetail = await Offer.findById(offerId);
            if(!offerDetail){
                res.json("böyle bir kayıt yok")
            }
            if(offerDetail.currency === "usd"){
                const currencyPrice = await axios.get('https://api.genelpara.com/embed/doviz.json');
                offerDetail.currencyPrice = currencyPrice.data['USD'].satis;
            }
            offerDetail.createBill = true;
            offerDetail.billDate = new Date();
            await offerDetail.save();
            res.status(200).json({ message: 'success' });
        } catch (error) {
            return res.json({error:error.message});
        }
    },
    async editOffer(req,res,next){
        try {
            const company = await Customer.find({}, 'companytitle _id')
            const products = await Products.find({}, 'productName _id');
            const findOffer = await Offer.findById(req.params.id);
            res.render("offer/editOffer",{url:req.projectUrl,offerData: findOffer,companyData:company,productsData:products, error:false})
        } catch (error) {
            next(error)
        }
    },
    async updateOffer(req,res,next){
        try {
            const company = await Customer.find({}, 'companytitle _id')
            const products = await Products.find({}, 'productName _id');
            let itemsList = [];
            let totalPrice = 0;
            for(let i = 0; i<req.body.productId.length ; i++){
              itemsList.push({
                  productId: req.body.productId[i],
                  piece: req.body.piece[i],
                  unit: req.body.unit[i],
                  unitPrice:req.body.unitPrice[i],
                  taxPercent: req.body.taxPercent[i]
              });
              totalPrice += totalItemPrice(parseFloat(req.body.piece[i]),parseFloat(req.body.unitPrice[i]),parseFloat(req.body.taxPercent[i]));
              
            }
            const trPrice = await  axios.get('https://api.genelpara.com/embed/doviz.json')
            const totaltrPrice_ = totalPrice * trPrice.data["USD"].satis;
            const offerDetail = await Offer.findById(req.params.id);
            offerDetail.title = req.body.title
            offerDetail.offerDate =  moment(req.body.offerDate, "DD.MM.YYYY HH.mm").toDate() 
            offerDetail.offerCondition = req.body.offerCondition
            offerDetail.currency= req.body.currency
            offerDetail.items= itemsList
            offerDetail.totalPrice=totalPrice.toFixed(2)
            offerDetail.unpaid = totaltrPrice_.toFixed(4)
            const editOffer =  await offerDetail.save();
            res.status(200).json({ message: 'success' });
           /*  res.render("offer/editOffer",{url:req.projectUrl,offerData:editOffer,companyData:company,productsData:products,error:false})  */
            
        } catch (error) {
            next(error)
        }
    },
    async deleteOffer(req,res){

     
        try {
            let error = null;
            if(error){
                return res.json({error});
              }
            const deleteItem = await Offer.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'success' });

              
        } catch (error) {
            return res.json({error:error.message});
        }
    }
}

module.exports = OfferController