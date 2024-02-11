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
        
        
});

const userschema=new mongoose.Schema({
    profile:String,
    username:String,
    email:String,
    password:String,
    confirmPassword:String,
    wishlist:[{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
    ],
    cart:[{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference to the Product model
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }],
    recentview:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Data",
        required:false,
    }]
});
const productdata=mongoose.model('Data',productsschema);
const imageschema=mongoose.model('homedata',dataschema2);
const userdata=mongoose.model("userdata",userschema);

module.exports={
    productdata,imageschema,userdata
}

