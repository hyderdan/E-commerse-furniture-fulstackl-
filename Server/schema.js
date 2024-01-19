const mongoose=require("mongoose");


const dataschema2=new mongoose.Schema({
    url: [{
        type: String,
        required: true,
      }]


});
const productsschema=new mongoose.Schema({
        image:[{
            type:String
        }],
        name:String,
        description:String,
        price:Number,
        quandity:Number,
        item: String
        
        
})
const userschema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    confirmPassword:String,
    wishlist:[{

    }],
    cart:[{
        type:mongoose.Types.ObjectId, 
        ref:"Data",
        required:false,
    }]
})
const productdata=mongoose.model('Data',productsschema);
const imageschema=mongoose.model('homedata',dataschema2);
const userdata=mongoose.model("userdata",userschema);

module.exports={
    productdata,imageschema,userdata
}

