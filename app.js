const express= require("express")
const mongoose =require("mongoose")
const cors = require("cors")
const router = require('./routers/router.js');
const authRouter = require('./routers/authRouter');
const configMid = require('./middlewares/configMid');
const authMiddleware = require('./middlewares/authMiddleware');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const { flash } = require('express-flash-message');
require('dotenv').config()
const url = process.env.MONGO_URL
const app = express()

app.use(configMid);
app.use(cookieParser());

app.use(
  session({
    secret: 'necip',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 8, // 1 week
  
    },
  })
);

app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(cors());





app.set('view engine', 'ejs');
app.get("view engine")

app.use(express.static('public')); 
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}));



app.get('/test',(req,res,next) => {
  res.json({ok:'test'});
});


app.use('/auth',authRouter);
app.use("/app", authMiddleware, router);

app.use(authMiddleware,function(req, res, next) {
  var err = new Error('Sayfa Bulunamadı');
  res.render("error",{url:req.projectUrl,data:err.message})
});
app.listen(5001, () => console.log("running at 5001 port"));


mongoose.connect(url, (err, res) => {
    if(err) throw err;
    console.log("mongoose is connected")
  })
  
module.exports = app;       