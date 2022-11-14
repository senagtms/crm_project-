const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const Joi = require('joi');


require('dotenv').config()

const secretKey = process.env.SECRET_KEY

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean
    }
},{timestamps:true})


function validation(user){

    const schema = new Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(50).required().email(),
        password:Joi.string().min(6).required(),
        status:Joi.boolean()

    });

    return schema.validate(user)

}

function validateLogin(user){

    const schema = new Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password:Joi.string().min(6).required()

    });

    return schema.validate(user)
}




const User = mongoose.model("User", UserSchema);

module.exports ={User, validation,validateLogin}