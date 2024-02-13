const { userdata, productdata } = require("../schema");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.stipe_secret_key);
const fs=require("fs")

const getuser = async function (req, res) {
  const data = await userdata.find({});
  res.status(200).send(data)
}
const singleuser= async(req,res)=>{
  const {userid}=req.params;
  
  const users=await userdata.findById({_id:userid});
  if(!users){
    return res.json(404).json({error:"usernot found"});
  }
  console.log(users);
  res.status(200).json({users});
}

const userlogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(`value ${req.body}`);
    const user = await userdata.findOne({ email });
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1hr"
      });

      res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60, });
      res.setHeader("Authorization", token);
      console.log(token, "requested token");



      res.status(200).json({ message: "welcome user", UserID: user._id, token });

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
    const { userid } = req.params
    const {profile} = req.body
    const user = await productdata.findByIdAndUpdate(userid, {profile,username, email, password, wishlist, cart,recentview}, { new: true })
    res.json(user)
    console.log(user)
  }
  catch (err) { console.log(err) }
};
const deleteuser= async function (req, res) {
try {
  const { _id } = req.params
  const { username, email, password, wishlist, cart,recentview} = req.body
  const product = await userdata.findByIdAndDelete(_id,{ username, email, password, wishlist, cart,recentview},{ new: true })
  res.json(product)
  console.log(product)
}
catch (err) { console.log(err) }
}
const addprofile=async(req,res)=>{
  try{
    const{userid}=req.params;
    const user=await userdata.findById(userid);
    console.log("pr",req.file);
    if(!user){
      return res.json(404).json({error:"usernot found"});
    }
    
     
      user.profile.push(req.file.filename);
       await user.save();
      res.status(200).json({message:"product added to profile"});
    
  }catch(err){
    console.log(err)
  }
}

const addToCart = async (req, res) => {
  try {
    const { value_id, sessionid, index } = req.body
    const product_id = await productdata.findById(value_id)
    const user = await userdata.findById(req.body.sessionid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingItemIndex = user.cart.find((item) => item.product.toString() === value_id);

    if (existingItemIndex) {
      // If the product already exists in the cart, increment its quantity
      existingItemIndex.quantity += 1;
      await user.save();
      res.status(200).json({ message: "Product added again", cart: user.cart });
    } else {
      user.cart.push({ product: product_id, quantity: 1 });
      await user.save();
      return res.status(200)
        .json({ message: "Product added to cart successfully", cart: user.cart });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};

const deletefromcart = async (req, res) => {
  try {
    const { value_id, sessionid, index } = req.body
    const product = await productdata.findById(value_id);
    const token = req.cookies.token;
    console.log("recevied token", token);;
    const user = await userdata.findById(sessionid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user) {
      if (index >= 0 && index < user.cart.length) {

        user.cart.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json({ message: "Product removed from cart successfully", cart: user.cart });
      }
    } else {
      console.log("error occured");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};


const getcart = async (res, req) => {
  try {
    const user = await productdata.find({})
    res.json(user)
  } catch (err) {
    console.log(err);

  }
}

const getcartproducts = async (req, res) => {
  try {
    const user = await userdata.findById(req.params.sessionid);
    res.json({ cartproducts: user?.cart })
  } catch {

  }
}


const fetchcart = async (req, res) => {
  try {
    const user = await userdata.findById(req.params.sessionid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract product IDs from the user's cart
    const productIds = user.cart.map(item => item.product);

    // Query productdata collection with the product IDs
    const productsWithQuantity = await productdata.find({
      _id: { $in: productIds }
    });

    // Combine product information with quantities from the user's cart
    const products = user.cart.map(item => {
      const product = productsWithQuantity.find(p => p._id.equals(item.product));
      return {
        ...item.toObject(),
        product: product,
        quantity: item.quantity
      };
    });
    const totalquantity = user.cart.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    // Send response with cart items and quantities
    res.status(200).json({ products, totalquantity });
  } catch (error) {
    console.error("Error fetching cart quantity:", error);
    res.status(500).json({ error: "Server error", error: error.message });
  }
};

const decrementcartquand = async (req, res) => {
  try {
    const { value_id, sessionid, index } = req.body
    const product_id = await productdata.findById(value_id)
    const user = await userdata.findById(sessionid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingItemIndex = user.cart.find((item) => item.product.toString() === value_id);

    if (existingItemIndex) {
      // If the product already exists in the cart, increment its quantity
      if (existingItemIndex.quantity <= 1) {

      }
      else {
        existingItemIndex.quantity -= 1;
        await user.save();
        res.status(200).json({ message: "Product decreaced again", cart: user.cart });
      }

    }



  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};




const addTowishlist = async (req, res) => {
  try {
    const { value_id, userid, index } = req.body
    const product_id = await productdata.findById(value_id)
    const user = await userdata.findById(req.body.userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingItem = user.wishlist.find((item) => item.product.toString() === value_id);
    const existingItemIndex = user.wishlist.findIndex((item) => item.product.toString() === value_id);
    if (existingItem) {

      user.wishlist.splice(existingItemIndex, 1);
      await user.save();
      res
        .status(200)
        .json({ message: "Product removed from wish;ist successfully", wishlist: user.wishlist })
    }
    else {
      user.wishlist.push({ product: product_id, quantity: 1 });
      await user.save();
      return res.status(200)
        .json({ message: "Product added to wishlist successfully", wishlist: user.wishlist });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};
const deletefromwishlist = async (req, res) => {
  try {
    const { value_id, userid, index } = req.body
    const product = await productdata.findById(value_id);
    const token = req.cookies.token;
    console.log("recevied token", token);;
    const user = await userdata.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user) {
      if (index >= 0 && index < user.wishlist.length) {

        user.wishlist.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json({ message: "Product removed from wish;ist successfully", wishlist: user.wishlist });
      }
    } else {
      console.log("error occured");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};



const getwishlist = async (req, res) => {
  try {
    const user = await productdata.find({})
    res.json(user)
  } catch (err) {
    console.log(err);

  }
}
const getwishproducts = async (req, res) => {
  try {
    const user = await userdata.findById(req.params.sessionid);
    res.json({ wishproducts: user?.wishlist })
  } catch {

  }
}
const fetchwishlist = async (req, res) => {
  try {
    const { value_id } = req.body
    const user = await userdata.findById(req.params.sessionid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract product IDs from the user's cart
    const productIds = user.wishlist.map(item => item.product);

    // Query productdata collection with the product IDs
    const productsWithQuantity = await productdata.find({
      _id: { $in: productIds }
    });

    // Combine product information with quantities from the user's cart
    const isInWishlist = user.wishlist.map(item => item.product);
    const wishlist = user.wishlist.map(item => {
      const product = productsWithQuantity.find(p => p._id.equals(item.product));
      return {
        ...item.toObject(),
        product: product,
        quantity: item.quantity
      };
    });
    const totalquantity = user.wishlist.reduce((total, item) => {
      return total + item.quantity
    }, 0);
    console.log(isInWishlist);
    res.status(200).json({ wishlist, totalquantity, isInWishlist });
  } catch (error) {
    console.error("Error fetching cart quantity:", error);
    res.status(500).json({ error: "Server error", error: error.message });
  }
};
const recentlyviewd = async (req, res) => {
  try {
    const rec = [];
    const { value_id, userid, index } = req.body
    const product = await productdata.findById(value_id);

    const user = await userdata.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.recentview.includes(value_id)) {

      return res.status(200).json({ message: "Product already in cart" });
    } else {
      user.recentview.push(product);
      await user.save();
      return res.status(200).json({ message: "Product added to recent views successfully", recentview: user.recentview });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error", message: err.message });
  }
};
const deletefromrecentlyviewed = async (req, res) => {
  try {
    const { value_id, userid, index } = req.body
    const product = await productdata.findById(value_id);
    const token = req.cookies.token;
    console.log("recevied token", token);;
    const user = await userdata.findById(userid);
    if (user) {
      if (index >= 0 && index < user.recentview.length) {

        user.recentview.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json({ message: "Product removed from cart successfully", recentview: user.recentview });
      }
    } else {
      console.log("error occured");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};
const getviewedproducts = async (req, res) => {
  try {
    const user = await productdata.find({})
    res.json(user)
  } catch (err) {
    console.log(err);

  }
};
const fechrecentlyviewed = async (req, res) => {
  try {
    const user = await userdata.findById(req.params.userid);
    res.json({ recentvieweddata: user?.recentview });
  } catch (err) {
    console.log(err);
  }
}
const fetchview = async (req, res) => {
  try {
    const user = await userdata.findById(req.params.userid)
    const recentview = await productdata.find({
      _id: { $in: user.recentview }
    })
    recentview.splice(4, 10);
    res.json({ recentlyv: recentview });
    // console.log(recentview);
  }
  catch (error) {
    res.json(error);
    console.log(error)
  };
};
const fetchview2 = async (req, res) => {
  try {
    const user = await userdata.findById(req.params.userid)
    const recentview = await productdata.find({
      _id: { $in: user.recentview }
    })

    res.json({ recentview });
  }
  catch (error) {
    res.json(error);
    console.log(error)
  };
};



module.exports = {
  userlogin,singleuser, Addusers, updateuser,deleteuser,addToCart, getuser, getcart, getcartproducts, fetchcart, decrementcartquand,
  addTowishlist, getwishlist, getwishproducts, fetchwishlist, deletefromwishlist,
  deletefromcart, recentlyviewd, deletefromrecentlyviewed,
  getviewedproducts, fechrecentlyviewed, fetchview, fetchview2,addprofile
}