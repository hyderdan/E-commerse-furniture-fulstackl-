const express=require("express");
const cors=require("cors")
const bodyparser=require("body-parser")
const {router2}=require("../Server/Routes/dataroutes")
const {router}=require("../Server/Routes/dataroute")
const{userrouter}=require("./Routes/userroute");
const{adminrouter}=require("./Routes/adminRoute");
const{paymentrouter}=require("./Routes/paymentroute")
const {Connect}=require("./config/config")
const app= express();
const PORT=3000
Connect()
require("dotenv").config();
app.use(bodyparser.json())
app.use(cors(
    {
        origin:"http://localhost:3001",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,
    }
))
app.use(express.static("profile"));

app.use("/product",router)
app.use("/homeimage",router2)
app.use("/users",userrouter)
app.use("/admin",adminrouter)
app.use("/payment",paymentrouter)


app.listen(PORT, () => {
    console.log("server started at port", PORT)
});
