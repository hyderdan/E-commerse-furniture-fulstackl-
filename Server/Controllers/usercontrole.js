const { userdata,productdata } = require("../schema");
const cookieParser= require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const getuser= async function (req, res) {
  const data = await userdata.find({});
  res.status(200).send(data)
}

const userlogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log(`value ${req.body}`);
        const user = await userdata.findOne({ email });
        console.log(user)
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ email:user.email }, process.env.JWT_SECRET,{
            expiresIn:"1hr"
          });
    
          res.cookie("token", token, { httpOnly: true,secure: true, maxAge: 1000 * 60 * 60, });
          res.setHeader("Authorization", token);
          console.log(token, "requested token");
        
          
    
          res.status(200).json({message :"welcome user",UserID:user._id, token});
    
        } else {
          res.status(401).send("Invalid email or password");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
      }
     
    };
    
    
const Addusers = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, wishlist, cart } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const userExists = await userdata.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userdata({ username, email, password: hashedPassword, cart, wishlist });
        await user.save()
        res.status(202).json({ message: "saved successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" })
    }
}


const updateuser = async function (req, res) {
    try {
        const { id } = req.params
        const { username, email, password,wishlist,cart } = req.body
        const user = await productdata.findByIdAndUpdate(id, { username, email, password,wishlist,cart }, { new: true })
        res.json(user)
        console.log(user)
    }
    catch (err) { console.log(err) }
};
const addToCart = async (req, res) => {
    try {
      const {value_id,sessionid,index} = req.body
      const product = await productdata.findById(value_id);
     
        const token = req.cookies.token;
      console.log("recevied token",token);
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userdata.findById(req.body.sessionid);
        user.cart.push(product);
        await user.save();
        res
    .status(200)
    .json({ message: "Product added to cart successfully",   cart:user.cart});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error", error: err.message });
    }
  };
  
  const deletefromcart=  async (req, res) => {
    try {
      const {value_id,sessionid,index} = req.body
      const product = await productdata.findById(value_id);
      const token = req.cookies.token;
      console.log("recevied token",token);;
      const user = await userdata.findById(sessionid);
      if (user) {
        if (index >= 0 && index < user.cart.length) {
      
        user.cart.splice(index,1);
        await user.save();
        res
        .status(200)
        .json({ message: "Product removed from cart successfully",   cart:user.cart});
      }
    }else{
      console.log("error occured");
    }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error", error: err.message });
    }
  };
  

  const getcart= async(res,req)=>{
    try{
      const user= await productdata.find({})
      res.json(user)
    }catch(err){
      console.log(err);

    }
  }
  
  const getcartproducts= async(req,res)=>{
    try{
      const user= await userdata.findById(req.params.sessionid);
      res.json({ cartproducts:user?.cart})
    }catch{

    }
  }
 
  const fetchcart=async (req,res)=>{
    try{
      const User = await userdata.findById(req.params.sessionid)
   const products = await productdata.find({
    _id: {$in: User.cart}
   })
      res.json({products});
      console.log(products);
    }
    catch(error)
    {
       res.json(error)
    }
   }
   
  //  const addTowishlist = async (req, res) => {
  //   try {
  //     const {value_id,sessionid} = req.body
  //     const product = await productdata.findById(value_id);
  //     if (!product) {
  //       return res.status(404).json({ message: "Product not found" });
  //     }
  //     const token = req.cookies.token;
  //     console.log("recevied token",token);
  //     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     const user = await userdata.findById(req.body.sessionid);
      
  //     if(user.wishlist.includes(value_id)){
  //       user.wishlist.splice(product,1);
  //     }
  //     else{
  //       user.wishlist.push(product);
  //     }
  //     // add the product to the cart
  //     await user.save();
  
  //   //  const updatedUser = await schema.findOne({ email: decoded.email });
  //   // const updatedUser = await userdata.findById(user._id).populate('cart');
  // res
  //   .status(200)
  //   .json({ message: "Product added to cart successfully",   wishlist:user.wishlist});
  
  //     // res
  //     //   .status(200)
  //     //   .json({ message: "Product added to cart successfully", product });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ error: "server error", error: err.message });
  //   }
  // };
  
  // const getwishlist= async(req,res)=>{
  //   try{
  //     const user= await productdata.find({})
  //     res.json(user)
  //   }catch(err){
  //     console.log(err);

  //   }
  // }
  // const getwishproducts= async(req,res)=>{
  //   try{
  //     const user= await userdata.findById(req.params.sessionid);
  //     res.json({ wishproducts:user?.wishlist})
  //   }catch{

  //   }
  // }
  // const fetchwishlist=async (req,res)=>{
  //   try{
  //     const user = await userdata.findById(req.params.sessionid)
  //  const wishedproducts = await productdata.find({
  //   _id: {$in: user.wishlist}
  //  })
  //     res.json({wishedproducts})
  //     console.log(wishedproducts);
  //   }
  //   catch(error)
  //   {
  //      res.json(error)
  //   }
  //  };
   const recentlyviewd = async (req, res) => {
    try {
      const {value_id,userid,index} = req.body
      const product = await productdata.findById(value_id);
     
        const token = req.cookies.token;
      console.log("recevied token",token);
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userdata.findById(req.body.userid);
        user.recentview.push(product);
        await user.save();
        res
    .status(200)
    .json({ message: "Product added to cart successfully",   recentview:user.recentview});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error", error: err.message });
    }
  };
  const deletefromrecentlyviewed=  async (req, res) => {
    try {
      const {value_id,userid,index} = req.body
      const product = await productdata.findById(value_id);
      const token = req.cookies.token;
      console.log("recevied token",token);;
      const user = await userdata.findById(userid);
      if (user) {
        if (index >= 0 && index < user.recentview.length) {
      
        user.recentview.splice(index,1);
        await user.save();
        res
        .status(200)
        .json({ message: "Product removed from cart successfully",   recentview:user.recentview});
      }
    }else{
      console.log("error occured");
    }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "server error", error: err.message });
    }
  };
  const getviewedproducts= async(req,res)=>{
    try{
      const user= await productdata.find({})
      res.json(user)
    }catch(err){
      console.log(err);

    }
  };
  const fechrecentlyviewed= async(req,res)=>{
    try{
      const user= await userdata.findById(req.params.userid);
      res.json({recentvieweddata:user?.recentview});
    }catch(err){
      console.log(err);
    }
  }
  const fetchview=async (req,res)=>{
    try{
      const user = await userdata.findById(req.params.userid)
   const recentview = await productdata.find({
    _id: {$in: user.recentview}
   })
   recentview.splice( 4,4);
      res.json({recentview});
      // console.log(recentview);
    }
    catch(error)
    {
       res.json(error);
       console.log(error)
    };
   };
   const fetchview2=async (req,res)=>{
    try{
      const user = await userdata.findById(req.params.userid)
   const recentview = await productdata.find({
    _id: {$in: user.recentview}
   })
   
      res.json({recentview});
    }
    catch(error)
    {
       res.json(error);
       console.log(error)
    };
   };


//  addTowishlist,getwishlist,getwishproducts,fetchwishlist,

module.exports = {
    userlogin, Addusers, updateuser,addToCart,getuser,getcart,getcartproducts,fetchcart,
    
     deletefromcart,recentlyviewd,deletefromrecentlyviewed,
    getviewedproducts,fechrecentlyviewed,fetchview,fetchview2
}