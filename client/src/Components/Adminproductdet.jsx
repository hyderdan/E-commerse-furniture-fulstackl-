import { useContext } from "react"
import mydata from "./Context"
import "./Style/Admimnproductdet.css"
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";


export default function Admiinproductdet(){
   const {Sofadata, Setsofadata}=useContext(mydata);
   const[editIndex,seteditIndex]=useState(null);
   const [editpass,seteditpass]=useState('')
   
   const [editedProduct, setEditedProduct] = useState({
    id: '',
    name: '',
    image: '',
    category: '',
    description: '',
    price: '',
    amount: '',
  });


  useEffect(() => {
    fechdata();
    }, []);
console.log(Sofadata);
const fechdata = async ()=>{
  const responce = await axios.get('http://localhost:5000/product');
  Setsofadata(responce.data);

}

const handleChange = (data) => {
  seteditIndex(data._id)
  seteditpass(data.price)
  };
 

  const handleSaveEdit = async(id,e) => {
    try {
      await axios.put(`http://localhost:5000/product/${id}`,{ price:e });
      fechdata();
      canceledit();
  } catch (error) {
      console.error('error occured while updating')
  }
};
  function canceledit() {
  seteditIndex(null);
  seteditpass('');


  }


   
  
  const handledelete=(id,productname)=>{
    if (window.confirm(`Are you sure you want to delete this product, "${productname}"?`)) {
      deleteProduct(id);
    }
  }

  const deleteProduct=async(id)=>{
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      fechdata();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }


    return(
        <div className="productmain">
            {Sofadata.map((data,index)=>(
                <div className="productsub">
            <img className="pthirdimg" src={data.image} alt="" /> 
            <h6>{data.name}</h6>    
            <p>{data.description}</p>   
            <p key={index}>₹{data.price}</p>
            
            {editIndex===data._id?(
                    <div>
       {/* <input type="text"  className="editspace" value={editedProduct.image}  onChange={(e) =>    setEditedProduct({ ...editedProduct, image: e.target.value })}/>
      <input type="text"  className="editspace" value={editedProduct.name}  onChange={(e) =>    setEditedProduct({ ...editedProduct, name: e.target.value })}/>
      <input type="text"  className="editspace" value={editedProduct.description}  onChange={(e) =>    setEditedProduct({ ...editedProduct, description: e.target.value })}/> */}
      <input type="text" className="editspace" value={editpass}  onChange={(e) =>seteditpass( e.target.value)}/>
                
                <button className="esave" onClick={()=>handleSaveEdit(data._id,editpass)}>Save</button>
                <button className="esave"  onClick={()=>canceledit()}>cancel</button>
                    </div>
                    ): (
                    <div>
                    <button onClick={()=> handleChange(data)} className="pbutton1">Edit</button>
                    <button onClick={()=>handledelete(data._id,data.name)} className="pbutton2">delete</button>
                        
                    </div>
                 )}
           
                </div>
            ))}
        </div>
    )
}