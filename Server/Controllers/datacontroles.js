const {productdata}= require("../schema");



const getallproducts= async function (req, res) {
    const data = await productdata.find({});
    res.status(200).send(data)
}
const productdetails=async (req,res)=>{
    try{
        console.log(req.params.id);
        const productdetails=await productdata.findById(req.params.id);
       if(productdetails){
        return res
        .status(200)
        .json(productdetails);
       }
       return res.status(404).json({error:"product not found"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"})
    }
}
const addproducts=async function (req, res) {
    try {
        const { image,name,description,price,quandity,item} = req.body
        const userid = new productdata({
            image,name,description,price,quandity,item
        })
        await userid.save()
        res.json({ message: "saved successfully" })
    }
    catch (err) { console.log(err) }
}
const updateproducts=async function (req,res){
    try {
        const { id } = req.params
        const {image,name,description,price,quandity,item, } = req.body
        const user = await productdata.findByIdAndUpdate(id, { image,name,description,price,quandity,item }, { new: true })
        res.json(user)
        console.log(user)
    }
    catch (err) { console.log(err) }
}
  const deleteproducts =async function(req,res){
    try{
    const {id}=req.params
    const {image,name,description,price,quandity,item,}=req.body
    const product=await productdata.findByIdAndDelete(id,{image,name,description,price,quandity,item },{new:true})
    res.json(product)
    console.log(product)
}
 catch(err){console.log(err)}
}

module.exports={
    getallproducts,productdetails,addproducts,updateproducts,deleteproducts
}