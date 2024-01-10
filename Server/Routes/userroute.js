const express=require("express");
const userrouter=express.Router();
const ProductControllers=require("../Controllers/usercontrole");

userrouter.get("/",ProductControllers.getallusers)
userrouter.get("/:id",ProductControllers.userdetails)
userrouter.post("/",ProductControllers.addusers)
userrouter.put("/:id",ProductControllers.updateuser)

module.exports={
    userrouter
}