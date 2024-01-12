const express=require("express");
const userrouter=express.Router();
const ProductControllers=require("../Controllers/usercontrole");
const cookieParser= require("cookie-parser");
const bodyParser= require("body-parser");
const userMiddleware=require("../middleware/usermiddleware")



userrouter.use(bodyParser.json());
userrouter.use(bodyParser.urlencoded({extended:true}));
userrouter.use(cookieParser());
userrouter.post("/login",ProductControllers.userlogin)
// userrouter.get("/:id",ProductControllers.userdetails)
userrouter.post("/register",ProductControllers.Addusers)
userrouter.put("/:id",ProductControllers.updateuser);
userrouter.post("/cart/:id",userMiddleware, ProductControllers.addToCart);


module.exports={
    userrouter
}