const express=require("express");
const userrouter=express.Router();
const ProductControllers=require("../Controllers/usercontrole");
const cookieParser= require("cookie-parser");



userrouter.use(cookieParser());
userrouter.get("/",ProductControllers.userlogin)
// userrouter.get("/:id",ProductControllers.userdetails)
userrouter.post("/register",ProductControllers.Addusers)
userrouter.put("/:id",ProductControllers.updateuser)

module.exports={
    userrouter
}