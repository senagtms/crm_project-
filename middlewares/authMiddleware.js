const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel');
const secretKey = process.env.SECRET_KEY

 async function authMiddleware(req,res,next){
    const token = req.cookies.jwt || null;
  
    try {
        if(!token){
            return res.redirect('/auth/login')
       }
        const userId =  jwt.verify(token,secretKey);
        //req._id = decodedToken
        const currentUser = await userModel.User.findById(userId,{password:0});
        if(!currentUser) return res.redirect('/auth/login');
        req.userData = currentUser;
        
        next()
     
 
    } catch (error) {
        console.log('error message =>',error.message)
        return  res.redirect('/auth/login');
    }

}

/* async function globalLocals(req, res, next) {
   res.locals({ 
      user: req.userData
    });
    next();

} */



module.exports = authMiddleware;