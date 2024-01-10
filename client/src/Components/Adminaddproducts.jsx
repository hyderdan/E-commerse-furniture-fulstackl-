import "./Style/Adaddproducts.css";
import { useEffect, useState } from "react";
import mydata from "./Context"
import { useContext } from "react";
import axios from "axios";




export default function Adminaddproducts() {
  const { Sofadata, Setsofadata } = useContext(mydata);
  const [imagearray, addimagearray] = useState([])
  const [imagE, addimage] = useState("");
  const [imagE2, addimage2] = useState("");
  const [imagE3, addimage3] = useState("");
  const [imagE4, addimage4] = useState("");
  const [imagE5, addimage5] = useState("");
  const [imagE6, addimage6] = useState("");
  const [namE, addname] = useState("");
  const [descriptioN, adddescription] = useState("");
  const [pricE, addprice] = useState(0);
  const [quanditY, addquandity] = useState(0);
  const [iteM, additem] = useState("");
  // const [addproducts,setaddproducts]=useState({
  //     image:'',
  //     name:"",
  //     description:'',
  //     price:'' ,
  //     quandity:'',
  //     item:'',
  //     id:''
  // });
  const [error, seterror] = useState([])


  // const handlechange = (f,d) => {
  //     setaddproducts({...addproducts,[f]:d});
  //     console.log(addproducts);
  // }

  const handlesave = async (e) => {

    // e.preventDefault()

    const handlerror = {};
    if (!imagearray) {
      handlerror.imagE = "This field is required";
    }
    if (!namE) {
      handlerror.namE = "This field is required";
    }
    if (!descriptioN) {
      handlerror.descriptioN = "This field is required";
    }
    if (!pricE) {
      handlerror.pricE = "This field is required";
    }
    if (!quanditY) {
      handlerror.quanditY = "This field is required";
    }
    if (!iteM) {
      handlerror.iteM = "This field is required";
    }

    seterror(handlerror);
    if (Object.keys(handlerror).length === 0) {

      addimagearray([imagE, imagE2, imagE3, imagE4, imagE5, imagE6]);
      // if(imagearray.length > 0){
      //   try {
      //     await axios.post('http://localhost:5000/product', {
      //       image: imagearray, name: namE, description: descriptioN,
      //       price: pricE, quandity: quanditY, item: iteM
      //     },
      //       (req, res) => console.log(req.body));
      //     // fectdata();    
      //   }
      //   catch (error) {
      //     console.error('error occured', error)
      //   }
      //   console.log(imagearray)
      // }
      }
  }
  const postData = async () => {

    try {
      await axios.post('http://localhost:5000/product', {
        image: imagearray, name: namE, description: descriptioN,
        price: pricE, quandity: quanditY, item: iteM
      },
        (req, res) => console.log(req.body));
      // fectdata();    
    }
    catch (error) {
      console.error('error occured', error)
    }
    addimage("")
    addimage2("")
    addimage3("")
    addimage4("")
    addimage5("")
    addimage6("")
    addname("")
    addprice("")
    adddescription("")
    additem("")
    addquandity("")
    console.log(imagearray)
  }

  useEffect(() => {
    
    if (imagearray.length > 0) {
      postData()
    }
  }, [imagearray])


  // const newp={
  //     image:addproducts.image,
  //     name:addproducts.name,
  //     description:addproducts.description,
  //     price:parseInt(addproducts.price),
  //     quandity:parseInt(addproducts.quandity),
  //     item:addproducts.item,
  //     id:parseInt(addproducts.id)
  // };
  // Setsofadata((Ndata) => [...Ndata, newp]);
  // alert('Product added successfully');
  // setaddproducts({
  //     image:'',
  //     name:"",
  //     description:'',
  //     price:'' ,
  //     quandity:'',
  //     item:'',
  //     id:''
  // })

  // }

  // }

  return (
    <div className="addmain">
      <div className="addsub1">
        <h1>ADD PRODUCTS</h1>
        {error.imagE && <span className="fsp">{error.imagE}</span>}
        <input value={imagE} onChange={(e) => addimage(e.target.value)} className="addimage" type="text" placeholder="image URL" /><br />
        {error.imagE && <span className="fsp">{error.imagE}</span>}
        <input value={imagE2} onChange={(e) => addimage2(e.target.value)} className="addimage" type="text" placeholder="image sub" /><br />
        {error.imagE && <span className="fsp">{error.imagE}</span>}
        <input value={imagE3} onChange={(e) => addimage3(e.target.value)} className="addimage" type="text" placeholder="image carousel1" /><br />
        {error.imagE && <span className="fsp">{error.imagE}</span>}
        <input value={imagE4} onChange={(e) => addimage4(e.target.value)} className="addimage" type="text" placeholder="image carousel2" /><br />
        {error.imagE && <span className="fsp">{error.imagE}</span>}
        <input value={imagE5} onChange={(e) => addimage5(e.target.value)} className="addimage" type="text" placeholder="image carousel3" /><br />
        {error.imagE && <span className="fsp">{error.imagE}</span>}
        <input value={imagE6} onChange={(e) => addimage6(e.target.value)} className="addimage" type="text" placeholder="image carousel4" /><br />
        {error.namE && <span className="fsp">{error.namE}</span>}
        <input value={namE} onChange={(e) => addname(e.target.value)} className="addimage" type="name" placeholder="name" /><br />
        {error.descriptioN && <span className="fsp">{error.descriptioN}</span>}
        <input value={descriptioN} onChange={(e) => adddescription(e.target.value)} className="addimage" type="description" placeholder="description" /><br />
        {error.pricE && <span className="fsp">{error.pricE}</span>}
        <input value={pricE} onChange={(e) => addprice(e.target.value)} className="addimage" type="price" placeholder="price" /><br />
        {error.quanditY && <span className="fsp">{error.quanditY}</span>}
        <input value={quanditY} onChange={(e) => addquandity(e.target.value)} className="addimage" type="quandity" placeholder="quandity" /><br />
        {error.iteM && <span className="fsp">{error.iteM}</span>}
        <input value={iteM} onChange={(e) => additem(e.target.value)} className="addimage" type="item" placeholder="qitem" /><br />

        <button onClick={() => handlesave()}>SUBMIT</button>
      </div>

    </div>
  )
}