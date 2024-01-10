const express=require("express");
const router2=express.Router();
const ProductControllers2=require("../Controllers/datacontroles2");

router2.get("/",ProductControllers2.getallproducts2)
router2.post("/",ProductControllers2.addproducts2)

module.exports={
    router2
}