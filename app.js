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
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

app.use(flash({ sessionKeyName: 'flashMessage' }));


/* app.use(authMiddleware,function (req, res, next) {
  res.locals.user = req.userData
  next();
});
 
 */
require('dotenv').config()


app.use(cors());


const url = process.env.MONGO_URL


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

app.listen(5001, () => console.log("running at 5001 port"));


mongoose.connect(url, (err, res) => {
    if(err) throw err;
    console.log("mongoose is connected")
  })
  
module.exports = app;       