import Header from "./Header";
import "./Style/CArt.css"
import {BiSolidOffer} from "react-icons/bi"
import { useContext } from "react";
import { useEffect } from "react";
import mydata from "./Context";
import{AiOutlineClose}from "react-icons/ai"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Cart(){
    const nav=useNavigate();
    const [Cartitem,setCartItems]=useState([]);
    const{Addtokart,Setaddtokart,Setcount1,Count1,settoken,token}=useContext(mydata);

    useEffect(() => {
        const fetchCartItems = async () => {
          try {
            const response = await axios.get("http://localhost:5000/users/cart", {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setCartItems(response.data.cart);
          } catch (error) {
            console.error("Error fetching cart items:", error);
          }
        };
    
        fetchCartItems();
      }, [token]);
    
  console.log(Cartitem);
    const cartless=(id)=>{
        
        
          const remove = Cartitem.filter((data)=>data.id!==id
          ); 
        setCartItems(remove)
        Setcount1(Count1-1)
       }
   
//    function priceinc(d){
//     const price=d.price
//    }
   const Increment=(id)=>{
    const newinc=Cartitem.map((data)=>
    data.id===id?{...data,quandity:data.quandity+1}:data );
    Setaddtokart(newinc);
   
   }
   const decrement=(id)=>{
    const newdec=Cartitem.map((data)=>
    data.id===id&&data.quandity>1?{...data,quandity:data.quandity-1}:data);
     Setaddtokart(newdec)   
   }

   const totalamount=()=>{
    return Cartitem.reduce((a,b)=>a+b.price*b.quandity,0);
   };
   const buttonclick=()=>{
    nav("/payment")
   }
   
    return(
        
        <div className="cartmaindiv">
            <Header/>
            <div className="cartsubdiv1">
        <h1>ADD TO CART</h1>
            </div>
            <div  className="cartsubdiv2">
            <h4><BiSolidOffer/></h4><h6>Available Offers</h6>
            <p>Add items worth ₹5,479 more to avail No Cost EMIs on Credit Cards! </p>
            </div>
            <div className="cartsubdiv3">
        <p className="subdiv3p1">Products</p>
        <p className="subdiv3p2">Delivery Date</p>
        <p className="subdiv3p3">Quantity</p>
        <p className="subdiv3p4">Total</p>
            </div>
            <div className="cartsubdiv4">
        {Cartitem.map((data,index)=>( 
          
            <div key={index} className="cartsubdivmini">
                <div  onClick={()=>cartless(data.id)} className="cartsubdivmini3"><AiOutlineClose/></div> 
                          
             <img className="subdiv4img" src={data.image} alt="" />
            <h5>{data.name}</h5>
            <h6>{data.description}</h6>
            <p>You can cancel your order before shipped,<br />
             and a full refund will be initiated.</p>
            <div className="quant">
           <Link className="incdcr"><div onClick={()=> Increment(data.id)} className="p1" >+</div></Link>
            <h5 >{data.quandity}</h5>
            <Link className="incdcr"><div onClick={()=>decrement(data.id)} className="p2">-</div></Link>
            </div>
             
            
             <div  className="cartsubdivmini2" >₹{data.price*data.quandity}</div>
            </div>
            )
        )
        }
            </div>
        <div className="totalpayment">
          <h4>₹{totalamount()}</h4> 
          <h3>Total Amount</h3> 
          <button onClick={()=>buttonclick()}>Buy NOW</button>
        </div>
        </div>
    )
    
}