import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import mydata from "./Context"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown';
import "./Style/Sofas.css"
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import Footer from "./Footer";
import { useState } from "react";
import "./Style/Allproducts.css"



export default function Dealzone(){
  const navigate=useNavigate();
  const[indexx,setindexx]=useState(-1)

  function viewproducts(value){
    if(islogedin===true){
    if(Productdetail.includes(value)){
      Setproductdetail(Productdetail.filter((d)=>d!==value))
    
      Setcount(Count-1)
  
   
     
  }
  else{
    const products=value;
    Setproductdetail([...Productdetail,products]);
    console.log(Productdetail)
    Setcount(Count+1)
    
  } 
}
  else{
    navigate("/login")
  }
    
  }
  function productsdetails(value){
    const products=value;
    Productdetail1.splice(0,1);
    Setproductdetail1([...Productdetail1,products]); 
    // console.log(Productdetail)
    navigate('/productdetails')   
  }
  
  const{Sofadata,Productdetail,Setproductdetail,Productdetail1,Setproductdetail1,Count,Setcount,islogedin}=useContext(mydata);

 

    return(
        <div>
      <div><Header/></div>
      <div className="sfirstdiv">
        <h1>All PRODUCTS</h1>
          </div>
      <div className="sseconddiv">
        <h5 className="Fh5">Filter:-</h5>  
        <div className="fdiv">   
     <Link className="flink" to={'/sofas'}>sofa</Link>
     <Link className="flink" to={'/bed'}>bed</Link>
     <Link className="flink" to={'/dining'}>dining</Link>
     </div>
    </div>


        <div className="Athirddiv">
         
        
          {Sofadata.map((data)=>(
            <div  className="sthirdsub">
              <div onClick={()=>viewproducts(data)} className="sbutton2">
                {Productdetail.includes(data)?<h5 className="sbuttonsub"><AiFillHeart/></h5>:<h5><AiOutlineHeart/></h5>}</div>
               
           <img className="Sthirdimg" src={data.image} alt="img" /> 
           <div className="sthirdmini">
           <h6>{data.name}</h6>
           <p>{data.description}</p>
           <button onClick={()=>productsdetails(data)} className="sbutton1">View Product</button>
           
           </div>
          
            </div>
        ))}
        
        </div>
        
        
         <div> <Footer/></div>
       </div>
    )
}