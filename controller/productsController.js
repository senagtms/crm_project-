const mongoose = require('mongoose')
const Products = require("../model/productsModel")

const ProductsController={
    async createProducts(req,res){
        try {

            let error = null;
            if(!req.body.productName || !req.body.amountStock || !req.body.unitPrice){
                error = 'Lütfen Yıldızlı Alanları Doldurun'
            }

            if(error){
                return res.json({error});
              }

           
            const product = new Products({
                productName:req.body.productName,
                amountStock:req.body.amountStock,
                unitPrice:req.body.unitPrice,
                purchasePrice: req.body.purchasePrice,
                salesPrice:req.body.salesPrice
            })
           const newProduct = await product.save();
            res.json({success:1}); 
        } catch (error) {
            return res.json({error:error.message});
        }
    },
    async listProduct(req,res){
        try {
            const list = await Products.find();

       
           res.render("products",{url:req.projectUrl, data:list}) 
            
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },
    async getByIdProduct(req,res){
        
            try {
                const valueProduct= await Products.findById(req.params.id);
                res.render("products/editProducts",{url:req.projectUrl,data:valueProduct})
                
            } catch (error) {
                res.json({
                    message: error.message
                })
            }
        
    },
    async editProduct(req,res){
        try {
    
            const editproduct = await Products.findByIdAndUpdate(req.params.id,req.body,{new:true});
           res.status(200).json({ message: 'success' });
            
        } catch (error) {
            return res.json({error:error.message});
        }
    },
    async deleteProduct(req,res){

        try {
            let error = null;
            if(error){
                return res.json({error});
              }
            const deleteItem = await Products.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'success' });

              
        } catch (error) {
            return res.json({error:error.message});
        }
    }
}

module.exports = ProductsController