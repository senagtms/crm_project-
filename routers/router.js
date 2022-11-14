
const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/customerController")
const UserController= require("../controller/userController");
const ProductsController = require("../controller/productsController")
const OfferController = require("../controller/offerController");
const BillController = require("../controller/billController");
const LogContoller = require("../controller/logController")
router.get('/', async (req,res,next)=>{

   res.render("index",{url:req.projectUrl})

});
router.get("/users",UserController.users)
router.get("/users/newUser",async(req,res)=>{
   res.render("users/newUser",{url:req.projectUrl,error:false})
})
router.post("/users/newUser",UserController.newUser)
router.get("/users/editUser/:id", UserController.getByIdUser)
router.post("/users/editUser/:id",UserController.editUser)
router.delete("/users/:id",UserController.deleteUser)





/* ------------ customer ---------------------- */
router.get('/customers',CustomerController.listCustomer);
router.get('/customers/newCustomer', async (req,res)=>{
   res.render("customers/newCustomer",{url:req.projectUrl,error:false})
});
router.post('/customers/newCustomer', CustomerController.createCustomer);
router.get('/customers/detailCustomer/:id',CustomerController.detailCustomer);
router.get('/customers/editCustomer/:id',CustomerController.editgetCustomer);
router.post('/customers/editCustomer/:id',CustomerController.editCustomer);
router.delete('/customers/:id',CustomerController.deleteCustomer);

/* ------------ /customer ---------------------- */


/* ------------ offer ---------------------- */
router.get('/offer',OfferController.list)
router.patch('/offer/:id',OfferController.createBill)
router.get('/offer/newOffer',OfferController.newOffer);
router.post('/offer/newOffer',OfferController.createOffer)
router.get('/offer/editOffer/:id',OfferController.editOffer);   
router.post('/offer/editOffer/:id',OfferController.updateOffer);   
router.delete('/offer/:id',OfferController.deleteOffer);


router.get('/products',ProductsController.listProduct);
router.get('/products/newProducts',(req,res)=>{
   res.render("products/newProducts",{url:req.projectUrl,error:false})
});
router.post('/products/newProducts', ProductsController.createProducts);
router.get('/products/editProducts/:id', ProductsController.getByIdProduct);
router.post('/products/editProducts/:id', ProductsController.editProduct);
router.delete('/products/:id',ProductsController.deleteProduct);
 

router.get('/bill',BillController.listBill);
router.get('/bill/billDetail/:id',BillController.detailBill);
router.get('/bill/addPayment/:id', BillController.payment);
router.patch('/bill/addPayment/:id',BillController.paymentSave)


router.get('/activeLog', LogContoller.list)





module.exports = router