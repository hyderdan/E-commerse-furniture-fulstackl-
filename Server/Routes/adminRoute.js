const express=require("express");
const adminrouter=express.Router();
const admincontroller=require("../Controllers/admin");
const cookieParser= require("cookie-parser");
const bodyParser= require("body-parser");
const userMiddleware=require("../middleware/usermiddleware")

adminrouter.use(bodyParser.json())
adminrouter.use(bodyParser.urlencoded({extended:true}))
adminrouter.post("/login", admincontroller.adminLogin)

module.exports = {
    adminrouter
}
