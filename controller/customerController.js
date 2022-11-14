const mongoose = require('mongoose')
const Customer = require("../model/customerModel")

const CustomerController={

 
    async createCustomer(req,res){
        try {
            let error = null;
            if(!req.body.companytitle || !req.body.name || !req.body.surname || !req.body.email || !req.body.phone){
                error = 'Lütfen Yıldızlı Alanları Doldurun'
            }

            if(error){
              //  return res.render("customers/newCustomer",{url:req.projectUrl,error});
              return res.json({error});
            }
            const customer = new Customer(
                {
                    companytitle : req.body.companytitle,
                    name:req.body.name,
                    surname:req.body.surname,
                    email:req.body.email,
                    phone:req.body.phone,
                    taxAdministration:req.body.taxAdministration,
                    taxNumber:req.body.taxNumber,
                    address:req.body.address,
                    fixedDiscount:req.body.fixedDiscount,
                    startBalance:req.body.startBalance
                }
            )
           const newCustomer = await customer.save();
        
          // res.render("customers",{url:req.projectUrl})
           res.json({success:1});

        } catch (error) {
            //res.render("customers/newCustomer",{url:req.projectUrl,error:error.message})
            return res.json({error:error.message});
        }
        
    },

    async listCustomer(req,res){
        try {

         const list = await Customer.find();
         res.render("customers",{url:req.projectUrl, data:list})

            
        } catch (error) {
             res.json({
                message: error.message
            })
            
        }



    },

    async detailCustomer(req,res){
        try {
            const detail = await Customer.findById(req.params.id);
            res.render("customers/detailCustomer",{url:req.projectUrl,data:detail})
            
        } catch (error) {
            res.json({
                message: error.message
            })
        }
       
    },
    async editgetCustomer(req,res){
        try {
            const valueCustomer = await Customer.findById(req.params.id);
            res.render("customers/editCustomer",{url:req.projectUrl,data:valueCustomer})
            
        } catch (error) {
            res.json({
                message: error.message
            })
        }
       
    },

    async editCustomer(req,res){
        try {
            
            const edited = await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.status(200).json({ message: 'success' });
            
        } catch (error) {
            return res.json({error:error.message});
        }

    },
    async deleteCustomer(req,res){

     
        try {
            let error = null;
            if(error){
                return res.json({error});
              }
            const deleteItem = await Customer.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'success' });

              
        } catch (error) {
            return res.json({error:error.message});
        }
    }

}

module.exports =  CustomerController;