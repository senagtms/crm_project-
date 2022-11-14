const express = require('express');
const authRouter = express.Router();
const UserController= require("../controller/userController");

authRouter.get('/login',async (req,res)=>{
    const message = await req.consumeFlash('error');
    let errorMessage = false;
    if(message.length){
       errorMessage = message[0];
    }
    res.render("auth/authLogin",{url:req.projectUrl,errorMessage})
 })
 authRouter.post('/login',UserController.login)
 authRouter.get("/logout", UserController.logout)

module.exports = authRouter;