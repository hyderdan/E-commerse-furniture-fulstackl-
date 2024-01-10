import "./Style/Chelsea.css"
import Header from "./Header"
import Carousel from 'react-bootstrap/Carousel';
import Footer from "./Footer";
import{TbTruckDelivery}from "react-icons/tb"
import{FaTools}from "react-icons/fa"
import{HiOutlineCurrencyRupee}from "react-icons/hi"
import { useContext } from "react";
import mydata from "./Context";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";

export default function Chelsea(){
    
    function Addtocart(value){
        if(Addtokart.includes(value)){
            Setaddtokart(Addtokart.filter((d)=>d!==value))
            Setcount1(Count1-1);
        }
        else{
          const cart=value;
          Setaddtokart([...Addtokart,cart]);
        console.log(Addtokart)
        Setcount1(Count1+1)
        } 
    }
   const{Addtokart,Setaddtokart,Count1,Setcount1,Sofadata}=useContext(mydata)
   const{id}=useParams();
   const[Productdetail1,Setproductdetail1]=useState([]);
   console.log(Productdetail1)
  //  const fetchproductsdetails= async()=>{
  //   try{
  //     const responce= await axios.get(`http://localhost:5000/product/${id}`,);
  //     Setproductdetail1(responce.data)
      
  //   }catch(err){
  //     console.error(err);
  //   }
  //  }
  //  useEffect(()=>{
  //   fetchproductsdetails();
  // },[]);
 
 
  useEffect(()=>{
    fectdata();
  },[]);
  const fectdata = async ()=>{
    const responce = await axios.get('http://localhost:5000/product');
    Setproductdetail1(responce.data);
  }
  const products=Productdetail1.filter((data)=>
  data._id===id
  );

 
    return(
        <div className="chelsea-adjust">
            <div><Header/></div>
            {
                products.map((data)=>(
                    <div className="chelseasub1">
         <h2>{data.name}</h2>
        <h3>{data.description}</h3>
        <h4>MRP:- Rs{data.price} </h4>
        <button onClick={()=>Addtocart(data)} className="chelseabutton">{Addtokart.includes(data)?"REMOVE FROM CART":"ADD TO CART"}</button>
        <div className="chelseasub2">
        <Carousel className="arinacarou"  data-bs-theme="dark">
      <Carousel.Item>     
    <img className="arinaimg" src={data.image[2]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
        <carousel-control-prev></carousel-control-prev>
      <img  className="arinaimg" src={data.image[3]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
      <img   className="arinaimg" src={data.image[4]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
      <img   className="arinaimg" src={data.image[5]} alt="img" />
      </Carousel.Item>
    </Carousel>
        </div>
        <div className="prductdet">
                    hello
        </div>
            </div>
            
        ))}
                      
        <div className="chelseasub3">
        <div  className="chelseasub3mini">
       <h2> <TbTruckDelivery/></h2>
        <h6>SAFE & SWIFT DELIVERY</h6>
        <p>Available in select cities.</p>
        </div>
        <div  className="chelseasub3mini2">
       <h2> <HiOutlineCurrencyRupee/></h2>
        <h6>EASY FINANCE</h6>
        <p>Pay via EMIs on credit cards or avail interest- <br /> free loans. </p>
        </div>
        <div  className="chelseasub3mini3">
       <h2> <FaTools/></h2>
        <h6>FREE INSTALLATION</h6>
        <p>We assemble the product, and clear away the packaging.</p>
        </div>
        </div>
        <div className="chelseasuvb4">
          <h2>Sets And Layouts</h2>
          <h5>______________</h5>
          <p>Explore common sets and the floor space recommended for each.</p>


        {
            products.map((data)=>(
                <div className="Ddiv"> <img className="imaged" src={data.image[1]} alt="img" /></div>
               
            ))
        }
          
        </div>
    
        <div><Footer/></div>
    
        </div>
     )
    }
