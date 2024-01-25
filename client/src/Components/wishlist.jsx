import './Style/Wishlist1.css'
import { useContext } from "react";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import mydata from "./Context";
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Getid from "./session";


export default function Wishlist(){
       const sessionid=Getid();
      const navigate=useNavigate();
      const{Productdetail,Setproductdetail,Productdetail1,Setproductdetail1,Count,Setcount,}=useContext(mydata)
      const [wishproducts, setwishproducts] = useState([]);

      useEffect(() => {
        // fetchwishlist();
        }, []);



//       const fetchwishlist = async()=>{
//         try{
//         const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`)
//         setwishproducts(response.data.products)
//         console.log("onlyidincart",response.data.products)
//       }
// catch(err){
//     console.log(err);
// }
// }  

     return(
     <div className="wishmain">
        <div><Header/></div>
        <div className="wishsub1">
        <h5>My Wishlist</h5>
        <div className="wthirddiv">
         
         {wishproducts.map((data)=>(
             <div  className="wthirdsub">
                <div  className="wbutton2">
                {Productdetail.includes(data._id)?<h5 className="wbuttonsub"><AiFillHeart/></h5>:<h5><AiOutlineHeart/></h5>}</div>
               
            <img className="wthirdimg" src={data.image} alt="img" /> 
            <div className="wthirdmini">
            <h6>{data.name}</h6>
            <p>{data.description}</p>
            <button  className="wbutton1">View Product</button>
            
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

