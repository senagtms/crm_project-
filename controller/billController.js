const mongoose = require('mongoose')
const Offer = require("../model/offerModel")
const Customer = require("../model/customerModel")
const Products = require("../model/productsModel")
const moment = require("moment");
const BillController ={
    async listBill(req,res,next){
        try {
            const company = []
            const list = await Offer.find({createBill:true});
            for(let i=0 ; i<list.length ; i++){
                const companytitle = await Customer.findById(list[i].companytitleId)   
                company.push(companytitle)
            } 
            res.render("bill",{url:req.projectUrl,billData:list,companyData:company})
            
        } catch (error) {
            return next(error)
        }
    },

    async detailBill(req,res,next){
        try {
            const list = await Offer.findById(req.params.id);
            const products = await Products.find({}, 'productName _id');
            const company = await Customer.findById(list.companytitleId);
            res.render("bill/billDetail",{url:req.projectUrl,billData:list, products_ : products,companyData:company})
        } catch (error) {
            next(error)
        }
    },

    async payment(req,res,next){
        try {
            const list = await Offer.findById(req.params.id);
            const products = await Products.find({}, 'productName _id');
            res.render("bill/addPayment",{url:req.projectUrl,listData:list,products_:products,error:false})
            
        } catch (error) {
            next(error)
            
        }
    },

    async paymentSave(req,res,next){
        try {
            
            const billId = req.params.id;
            const billDetail  = await Offer.findById(billId);
            billDetail.payment = req.body.payment;
            billDetail.paymentDate = moment(req.body.paymentDate, "DD.MM.YYYY HH.mm").toDate();
            billDetail.unpaid = parseFloat(billDetail.unpaid) - parseFloat(billDetail.payment)
            await billDetail.save();
            res.status(200).json({ message: 'success' }); 
            
        } catch (error) {
            return res.json({error:error.message});
        }
    }
}

module.exports=BillController


