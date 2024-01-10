const express=require("express");
const router=express.Router();
const ProductControllers=require("../Controllers/datacontroles");
const {userMiddleware}=require("../middleware/usermiddleware")

router.get("/",ProductControllers.getallproducts)
router.get("/:id",ProductControllers.productdetails)
router.post("/",ProductControllers.addproducts)
router.put("/:id",ProductControllers.updateproducts)
router.delete("/:id",ProductControllers.deleteproducts)
module.exports={
    router
}