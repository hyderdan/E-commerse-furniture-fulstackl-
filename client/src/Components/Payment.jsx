import "./Style/Payment.css";
import mydata from "./Context";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Getid from "./session";
export default function Payment(){
    const {Cartproducts}=useContext(mydata);
    const[order,setorder]=useState([]);
    const sessionid = Getid();
    useEffect(()=>{
        fetchcart();
    },[])
    const fetchcart = async () => {
        try {
    
    
          const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {})
          setorder(response.data.products);
          console.log("onlyidincart", response.data.products);
         
        }
        catch (err) {
          console.log(err);
        }
      }
    
    return(
       <section className="Sectionp">
        <div className="Pcontainer">
        <h1>Payment Details</h1>
        </div>
        <div className="orders">
           {order.map((data)=>(
            
           ))}
        </div>
       </section>
    )
}