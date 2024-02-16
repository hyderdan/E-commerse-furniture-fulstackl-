import './Style/Wishlist1.css'
import { useContext } from "react";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import mydata from "./Context";
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import Getid from "./session";
import Gettoken from './sessiontoken';
import Header2 from './Header2';


export default function Wishlist(){
  const userid=Getid();
       const sessiontoken = Gettoken();
      const navigate=useNavigate();
      const{Productdetail,Setproductdetail,
        Setcount,wishproducts, setwishproducts}=useContext(mydata)
      

      useEffect(() => {
        fetchwishlist();
        
        }, []);

      
        const fetchwishlist = async () => {
          try {
      
      
            const response = await axios.get(`http://localhost:5000/users/wish/${userid}`, {})
            setwishproducts(response.data.wishlist)
            Setcount(response.data.totalquantity); 
            console.log("onlyidincart", response.data.wishlist)
            console.log("total", response.data.totalquantity);
            console.log("tt", response.data.WishS);
          }
          catch (err) {
            console.log(err);
          }
        };

        
        const deletefromwishlist = async (delete_id, index) => {
          try {
            if (!sessiontoken) {
              console.log("user not authenticated");
              // nav("/login")
            }
            else {
              const response = await axios.post(
                "http://localhost:5000/users/wishlist/delete", { delete_id, index,userid},
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `${sessiontoken}`,
                  },
                }
              );
              console.log(response.data.wishlist);
              fetchwishlist();
              //   setSavedcart(response.data.cart);
              //   setcartindex(false);
              //   alert(response.data.message); 
      
            }
          } catch (error) {
            alert("Error adding to cart")
      
            console.error("Error adding to cart:", error);
          }
      
        };
        

     return(
     <div className="wishmain">
        <div><Header2/></div>
        <div className="wishsub1">
        <h5>My Wishlist</h5>
        <div className="wthirddiv">
         
         {wishproducts.map((data,index)=>(
             <div  className="wthirdsub">
                <div  className="wbutton2">
               <h5 onClick={()=>deletefromwishlist(data._id,index)} className="wbuttonsub"><AiFillHeart/></h5></div>
               
            <img className="wthirdimg" src={data.product.image} alt="img" /> 
            <div className="wthirdmini">
            <h6>{data.product.name}</h6>
            <p>{data.product.description}</p>
           
            
            </div>
           
             </div>
         ))}
         </div>
        </div>
        <div className='wfooter'>  
            <Footer/>       
        </div>
        </div>
     );
        }

