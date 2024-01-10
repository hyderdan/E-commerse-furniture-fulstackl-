import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import mydata from "./Context"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown';
import "./Style/Sofas.css"
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router-dom";



export default function Sofas(){
  const navigate=useNavigate();
  const[index,setindex,]=useState(-1)

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
    
    recentsub.splice(3,3)
    setrecently([...recently,products]);
    setrecentsub([...recentsub,products])
     
  }
  
  const{Sofadata,Productdetail,Setproductdetail,Count,Setcount,islogedin,recently,setrecently,
    setrecentsub,recentsub}=useContext(mydata);

  const sofas=Sofadata.filter((data)=>
  data.item==="sofa"
  );
  

    return(
        <div>
      <div><Header/></div>
      <div className="sfirstdiv">
        <h1>Sofas</h1>
        <p>Discover the perfect blend of comfort and affordability with Urban Ladder's exceptional range of affordable sofa set. Elevate your living space without breaking the  <br/>
        bank, as our collection caters to budget-conscious yet style-savvy individuals. Explore a variety of sofa design, colors, and fabrics that resonate with your taste,<br/>
         transforming your home into a haven of comfort and charm. Dive into a world of comfort that doesn't compromise on style at Urban Ladder today. </p>
      </div>
      <div className="sseconddiv">
        <p>Filter</p>     
      <Dropdown className="dropdown1">
      <Dropdown.Toggle className="stogle1" > Price</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1"></Dropdown.Item>
        <Dropdown.Item href="#/action-2"></Dropdown.Item>
        <Dropdown.Item href="#/action-3"></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown className="dropdown2">
      <Dropdown.Toggle  className="stogle2" >color</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item  href="#/action-1">black</Dropdown.Item>
        <Dropdown.Item href="#/action-2">grey</Dropdown.Item>
        <Dropdown.Item href="#/action-3">brown</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>


        <div className="sthirddiv">
         
        {sofas.map((data)=>(
          <Link className="Hlink" to={`/productdetails/${data._id}`}>
            <div onClick={()=>productsdetails(data)} className="sthirdsub">
              <div onClick={(e)=>{viewproducts(data);e.preventDefault()}} className="sbutton2">
                {Productdetail.includes(data)?<h5 className="sbuttonsub"><AiFillHeart/></h5>:<h5><AiOutlineHeart/></h5>}</div>   
           <img className="Sthirdimg" src={data.image} alt="img" /> 
           <div className="sthirdmini">
           <h6>{data.name}</h6>
           <p>{data.description}</p>
           <p>₹{data.price}</p>
           <button  className="sbutton1">View Product</button>
           
           </div>
          
            </div>
           </Link>
        ))}
        </div>
        <div> <Footer/></div>
       </div>
    )
}