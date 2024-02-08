const express=require("express");
const userrouter=express.Router();
const ProductControllers=require("../Controllers/usercontrole");
const cookieParser= require("cookie-parser");
const bodyParser= require("body-parser");
const userMiddleware=require("../middleware/usermiddleware");



userrouter.use(bodyParser.json());
userrouter.use(bodyParser.urlencoded({extended:true}));
userrouter.use(cookieParser());
userrouter.get('/',ProductControllers.getuser);
userrouter.delete('/:_id',ProductControllers.deleteuser);
userrouter.post("/login",ProductControllers.userlogin)
userrouter.post("/register",ProductControllers.Addusers)
userrouter.put("/:id",ProductControllers.updateuser);
userrouter.post("/usercart",userMiddleware, ProductControllers.addToCart);
userrouter.post("/usercart/delete",userMiddleware, ProductControllers.deletefromcart);
userrouter.get("/savedcart",ProductControllers.getcart);
userrouter.get("/savedcart/ids/:sessionid",ProductControllers.getcartproducts);
userrouter.get("/savedcart/:sessionid",ProductControllers.fetchcart);
userrouter.post("/usercart/decrement",userMiddleware,ProductControllers.decrementcartquand);
userrouter.post("/wishlist",userMiddleware,ProductControllers.addTowishlist);
userrouter.post("/wishlist/delete",userMiddleware, ProductControllers.deletefromwishlist);
userrouter.get("/wish",ProductControllers.getwishlist);
userrouter.get("/wish/idw/:sessionid",ProductControllers.getwishproducts);
userrouter.get("/wish/:sessionid",ProductControllers.fetchwishlist);
userrouter.post("/recentlyviewed",userMiddleware, ProductControllers.recentlyviewd);
userrouter.get("/recent", ProductControllers.getviewedproducts);
userrouter.get("/recent/idr/:userid", ProductControllers.fechrecentlyviewed);
userrouter.get("/recent/:userid", ProductControllers.fetchview);
userrouter.get("/recent/2/:userid", ProductControllers.fetchview2);
userrouter.post("/recentviewed/delete",userMiddleware, ProductControllers.deletefromrecentlyviewed);


module.exports={
    userrouter
}