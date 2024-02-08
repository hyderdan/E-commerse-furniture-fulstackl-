const cookieParser= require("cookie-parser");
const bodyParser= require("body-parser");
const userMiddleware=require("../middleware/usermiddleware")
const paymentcontrol=require("../Controllers/Payment");
const express=require("express");
const paymentrouter=express.Router();



paymentrouter.use(bodyParser.json());
paymentrouter.use(bodyParser.urlencoded({extended:true}));
paymentrouter.use(cookieParser());

paymentrouter.post("/create-payment-intent",paymentcontrol.paymentcontrol)

module.exports={
    paymentrouter
}