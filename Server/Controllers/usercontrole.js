const {userdata}= require("../schema");


const getallusers= async function (req, res) {
    const data = await userdata.find({});
    res.status(200).send(data)
}
const userdetails=async (req,res)=>{
    try{
        console.log(req.params.id);
        const userdetails=await userdata.findById(req.params.id);
       if(userdetails){
        return res
        .status(200)
        .json(userdetails);
       }
       return res.status(404).json({error:"product not found"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"})
    }
}
const addusers=async function (req, res) {
    try {
        const {  username,email, password, cart} = req.body
        const userid = new userdata({
            username,email,password,cart
        })
        await userid.save()
        res.json({ message: "saved successfully" })
    }
    catch (err) { console.log(err) }
}

const updateuser=async function (req,res){
    try {
        const { id } = req.params
        const { username,email, password, cart} = req.body
        const user = await productdata.findByIdAndUpdate(id, {  username,email, password, cart }, { new: true })
        res.json(user)
        console.log(user)
    }
    catch (err) { console.log(err) }
}


module.exports={
    getallusers,userdetails,addusers,updateuser
}