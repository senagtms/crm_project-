const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel');
const secretKey = process.env.SECRET_KEY

 async function authMiddleware(req,res,next){

    const token = req.cookies.userToken || null;
  
    try {
        if(!token){
            return res.redirect('/auth/login')
       }
        const userId =  jwt.verify(token,secretKey);
        const currentUser = await userModel.User.findById(userId,{password:0});
        if(!currentUser) return res.redirect('/auth/login');

        res.cookie("userToken", token);
        req.userData = currentUser;
        res.locals.user = req.userData
        
        next()
     
 
    } catch (error) {
        console.log('error message =>',error.message)
        return  res.redirect('/auth/login');
    }

}



module.exports = authMiddleware;