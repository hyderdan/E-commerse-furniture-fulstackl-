const { userdata } = require("../schema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const userlogin = async function (req, res) {
<<<<<<< HEAD
=======
    
>>>>>>> sub
    try {
        const { email, password } = req.body;
        const user = await userdata.findOne({ email });
        console.log(user)
        if (user && ( bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ email:user.email }, process.env.JWT_SECRET,{
<<<<<<< HEAD
            expiresIn:"24hr"
=======
            expiresIn:"1hr"
>>>>>>> sub
          });
    
          res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60, });
          res.setHeader("Authorization", token);
          console.log(token, "requested token");
        
          
    
          res.status(200).json({message :"welcome user", token});
    
        } else {
          res.status(401).send("Invalid email or password");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
      }
     
    };
<<<<<<< HEAD
    
    
=======
>>>>>>> sub
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
}


module.exports = {
    userlogin, Addusers, updateuser
}