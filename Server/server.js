const express=require("express");
const cors=require("cors")
const bodyparser=require("body-parser")
const {router2}=require("../Server/Routes/dataroutes")
const {router}=require("../Server/Routes/dataroute")
const{userrouter}=require("./Routes/userroute")
const {Connect}=require("./config/config")
const app= express();
const PORT=5000

app.use(bodyparser.json())
app.use(cors())
app.use("/product",router)
app.use("/homeimage",router2)
app.use("/users",userrouter)


app.listen(PORT, () => {
    console.log("server started at port", PORT)
});
