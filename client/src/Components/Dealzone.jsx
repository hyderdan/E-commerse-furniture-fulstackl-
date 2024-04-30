import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import mydata from "./Context"
import "./Style/Sofas.css"
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import Footer from "./Footer";
import { useState } from "react";
import "./Style/Allproducts.css";
import Gettoken from "./sessiontoken";
import Getid from "./session";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import "./Style/Bed.css"
import Header2 from "./Header2";


export default function Dealzone(){
  const navigate=useNavigate();
  const[indexx,setindexx]=useState(-1);
  const sessiontoken = Gettoken();
  const userid = Getid();


  const{Sofadata,setwishliststatus, wishliststatus,Setcount,}=useContext(mydata);
  useEffect(() => {
    // fechwishlist();
    fechrecentlyviewed();
    totalwishquand();
  }, []);

  const fechrecentlyviewed = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/recent/idr/${userid}`

      );

      console.log("recentlyvirewd", response.data.recentvieweddata)

      //  console.log("fechcart",response.data) 
    } catch (error) {
      console.error("Error occurs:", error);
    }
  };
  const recntlyviewed = async (value_id) => {

    try {
      if (!sessiontoken) {
        console.log("user not authenticated");
      }
      else {

        const response = await axios.post(
          "http://localhost:3000/users/recentlyviewed", { value_id, userid },

          {
            withCredentials: true,
            headers: {
              Authorization: `${sessiontoken}`,
            },
          }
        );
        console.log(response.data.recentview);
      }
    } catch (error) {
      alert("Error adding to wishlist")
      console.error("Error adding to wish:", error);
    }
  };
  const fechwishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/wishedproduct/idw/${userid}`,

      );
      console.log("cartproducts", response.data.wishlistproducts)

      //  console.log("fechcart",response.data) 
    } catch (error) {
      console.error("Error occurs:", error);
    }
  };

  const wishlisted = async (value_id, index) => {
    try {
      if (!sessiontoken) {
        console.log("user not authenticated");
       
        navigate("/login")
      }
      else {

        const response = await axios.post(
          "http://localhost:3000/users/wishlist", { value_id, userid },

          {
            withCredentials: true,
            headers: {
              Authorization: `${sessiontoken}`,
            },
          }
        );

        console.log("wish", response.data.wishlist);
        // alert(response.data.message);
        totalwishquand(value_id);
      }
    } catch (error) {
      alert("Error adding to ")

      console.error("Error adding to cart:", error);
    }

  };
  const totalwishquand = async (value_id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/wish/${userid}`, { value_id });
      Setcount(response.data.totalquantity);

      // const productInWishlist = wishlistItems.find(item => item.product._id === );
      setwishliststatus(response.data.isInWishlist);
      console.log("red", wishliststatus);
      console.log("total", response.data.totalquantity)
    }
    catch (err) {
      console.log(err);
    }
  }
 

    return(
        <div>
      <div><Header2/></div>
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


        <div className="bthirddiv">
         
        
          {Sofadata.map((data)=>(
            <Link className="Hlink" to={`/productdetails/${data._id}`}>
            <div onClick={() => recntlyviewed(data._id)} className="bthirdsub">
            <div onClick={(d)=>{ wishlisted(data._id);d.preventDefault()}} className="sbutton2">
                {wishliststatus.includes(data._id)?<h5 className="sbuttonsub"><AiFillHeart/></h5>:<h5><AiOutlineHeart/></h5>}</div>
              <img className="bthirdimg" src={data.image} alt="img" />
              <div className="bthirdmini">
                <h6>{data.name}</h6>
                <p>₹{data.price}</p>
                <button className="bbutton1">View Product</button>
              </div>
            </div>
          </Link>
          ))}
        
        </div>
        
        
         <div> <Footer/></div>
       </div>
    )
}