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
    const [Totalprice,settotalprice]=useState(0)
    const sessionid = Getid();
    useEffect(()=>{
        fetchcart();
        
    },[])
    const fetchcart = async () => {
        try {
    
    
          const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {})
          setorder(response.data.products);
          console.log("onlyidincart", response.data.products);
          
          settotalprice(calculateTotalPrice ());
          console.log("O",Totalprice)
        }
        catch (err) {
          console.log(err);
        }
      }
      const calculateTotalPrice = () => {
        let totalPrice = 0;
    
        order.forEach((data) => {
          totalPrice += data.product.price * data.quantity
        });
        return totalPrice;
        
      };
     
    return(
       <section className="Sectionp">
        <div className="Pcontainer">
        <h1>Payment Details</h1>
        
        <div className="orders">
        </div>
        <div className="orderdetails">
          
          </div>
          <div className="amountpay">
        <h5>Amount Payable</h5><span className="totalmoney">₹{calculateTotalPrice()}</span>
        <div className="amountsub">
        {order.map((data)=>(
          <div>
          <h6>{data.product.name}</h6>
          <p className="price">₹{data.product.price}</p> 
          </div>
        ))}
        </div>
        </div>
          </div>
       </section>
    )
}