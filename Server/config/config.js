const mongoose= require("mongoose")

const Connect=mongoose.connect("mongodb://127.0.0.1:27017/products")
.then(() => console.log("connected")).catch((err) => console.log(err))

module.exports={
    Connect
}