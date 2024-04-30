import "./Style/Chelsea.css";
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
import { Link } from "react-router-dom";
import Getid from "./session";
import Gettoken from "./sessiontoken";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header2 from "./Header2";

export default function Chelsea(){
    
   
   const{Addtokart,Setaddtokart,Count1,Setcount1,settoken,token,Cartproducts,setCartproducts}=useContext(mydata)
   const{id}=useParams();
   const[Productdetail1,Setproductdetail1]=useState([]);
   const[savedcart,setSavedcart]=useState([]);
   const[cartindex,setcartindex]=useState(true);
   const sessionid=Getid();
  const sessiontoken=Gettoken();
  const nav=useNavigate();
 
 
  useEffect(()=>{
    fectdata();
    fechAddtocart();
   
  },[]);
  const fectdata = async ()=>{
    const responce = await axios.get('http://localhost:3000/product');
    Setproductdetail1(responce.data);
  }
  const products=Productdetail1.filter((data)=>
  data._id===id
  );
  const fechAddtocart=async()=>{
    try {
      const response = await axios.get(
        `http://localhost:3000/users/savedcart/ids/${sessionid}`,
             
      );
     
     console.log("cartproducts",response.data.cartproducts)
    
    //  console.log("fechcart",response.data) 
    } catch (error) {
      console.error("Error occurs:", error);
    }
  };
  const totalquand = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/savedcart/${sessionid}`, {})
      Setcount1(response.data.totalquantity);
      console.log("total", response.data.totalquantity)
    }
    catch (err) {
      console.log(err);
    }
  }

  const Addtocart=async(value_id,index)=>{
    try {
      if(!sessiontoken){
        console.log("user not authenticated");
        toast.info("user not authenticated",{
          position:"top-center",
          autoClose:2500,
          theme:"dark"
        })
        // nav("/login")
      }
      else{
       
      const response = await axios.post(
        "http://localhost:3000/users/usercart",{value_id,sessionid},
        
        {
          withCredentials: true,
          headers: {
            Authorization: `${sessiontoken}`,
          },
        }
      );
          console.log(response.data.cart);
          setSavedcart(response.data.cart);
          sessionStorage.setItem("valueId",value_id);
          setcartindex(false);
          totalquand();
      toast.success(response.data.message,{
        autoClose:1000,
        position:"top-center"
      }); 
      
    }
    } catch (error) {
      alert("Error adding to cart")
    
      console.error("Error adding to cart:", error);
    }
    
  };
  const deletefromcart=async(delete_id,index)=>{
    try {
      if(!sessiontoken){
        console.log("user not authenticated");
        // nav("/login")
      }
      else{
      const response = await axios.post(
        "http://localhost:3000/users/usercart/delete",{delete_id,index,sessionid}, 
        {
          withCredentials: true,
          headers: {
            Authorization: `${sessiontoken}`,
          },
        }
      );
          console.log(response.data.cart);
          setSavedcart(response.data.cart);
          setcartindex(false);
      alert(response.data.message); 
      
    }
    } catch (error) {
      alert("Error adding to cart")
    
      console.error("Error adding to cart:", error);
    }
    
  };
  

 
 
    return(
        <div className="chelsea-adjust">
            <div><Header2/></div>
            {
                products.map((data,index)=>(
                    <div className="chelseasub1">
         <h2>{data.name}</h2>
        <h3>{data.description}</h3>
        <h4>MRP:- Rs{data.price} </h4>
        <div><button onClick={()=>Addtocart(data._id,index)}
        className="chelseabutton">ADD TO CART</button>
        {/* <button onClick={()=>deletefromcart(data._id,index)}
        className="chelseabutton">Remove FROM CART</button>} */}
        </div>
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
                    <Link to={"/copy"}>click</Link>
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
