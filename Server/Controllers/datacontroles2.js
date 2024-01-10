const {imageschema}= require("../schema");

const getallproducts2= async function (req, res) {
    const data = await imageschema.find({});
    res.status(200).send(data)
}
const addproducts2=async function (req, res) {
    try {
        const { url } = req.body
        const userid = new imageschema({
             url
        })
        await userid.save()
        res.json({ message: "saved successfully" })
    }
    catch (err) { console.log(err) }
}

module.exports={
    getallproducts2,addproducts2
}