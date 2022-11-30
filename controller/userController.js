const {User , validation ,validateLogin}  = require("../model/userModel")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt');
const Log = require("../model/logModel");

const UserController={


   async login(req,res,next){
        try{

            const {error} = validateLogin(req.body);
            if(error){
                await req.flash('error', 'Giriş Bilgilerini Kontrol Edin');
                return res.redirect('/auth/login');
            }
            let user = await User.findOne({username:req.body.username})
            if(!user){
               await req.flash('error', 'Hatalı kullancı adı ya da parola');
               return res.redirect('/auth/login');
            }
            const isSuccess = await  bcrypt.compare(req.body.password,user.password)
            if(!isSuccess){
               await req.flash('error', 'Hatalı kullancı adı ya da parola');
               return res.redirect('/auth/login');
            }


            const token = jwt.sign({ _id: user._id, username:user.username},process.env.SECRET_KEY);
            res.cookie('userToken',token,{httpOnly:true}) 

            const logUserData = await Log.find({userId: user._id})
             const logData = new Log({
                userId:user._id,
                message:"Giriş Yaptı",
                date: Date.now()
            })

             if(logUserData.length == 0){
                await logData.save()
            }
            else{
                await Log.findOneAndUpdate({userId:logData.userId},{date:logData.date})
            }
            

            res.redirect('/app');
          
        }catch (e){
            console.log('e => ',e.message);
            res.json(e);
        }
   },

   async logout(req,res,next){

        res.clearCookie("userToken", "")
        res.redirect("/auth/login")
 
   },
   async users(req,res){
    try {

        const list = await User.find();
        res.render("users",{url:req.projectUrl, data:list})

           
       } catch (error) {
            res.json({
               message: error.message
           })
           
       }

   },
   async newUser(req,res){
        try {
                const {error} = validation(req.body);
                if(error){
                    return res.status(400).send(error.details[0].message)
                }
        
                let user = await User.findOne({email:req.body.email})
                if(user){
                    return res.status(400).send("Bu mail adresi başka bir kullanıcıya ait")
                }
        
                const hashedPassword = await bcrypt.hash(req.body.password,10)
        
                user= new User({
                    username:req.body.username,
                    email:req.body.email,
                    password:hashedPassword,
                    status: true
                })
              
               const newUser =  await user.save()
               console.log(newUser)
                res.json({success:1});
                
        } catch (error) {
            return res.json({error:error.message});
        }
   

   },
   async getByIdUser(req,res){
        try {
            const valueUser = await User.findById(req.params.id);
            res.render("users/editUser",{url:req.projectUrl,data:valueUser})
        } catch (error) {
            res.json({
                message: error.message
            })
        }
   },
   async editUser(req,res){

        try {

            const user = await User.findById(req.params.id);
            let hashedPassword = null;

             if(req.body.password){
                hashedPassword = await bcrypt.hash(req.body.password,10)
             }  
             else{
                hashedPassword = user.password
             }
           const edituser = await User.findByIdAndUpdate(req.params.id,{username:req.body.username, email:req.body.email, password:hashedPassword, status:req.body.status}, {new:true})

            res.status(200).json({ message: 'success' }); 
        } catch (error) {
             return res.json({error: error.message})
        }

       
   },
   async deleteUser(req,res){

        try {
            const error = null
            if(error){
                return res.json({error});
            }
            const deleteuser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'success' });

        } catch (error) {
            res.json({error:error.message})
        }
   }
}

module.exports = UserController