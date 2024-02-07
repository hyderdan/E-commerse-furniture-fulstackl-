import "./Style/Payment.css";
import mydata from "./Context";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Getid from "./session";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js"

export default function Payment(){
    const {Cartproducts}=useContext(mydata);
    const[order,setorder]=useState([]);
    const [Totalprice,settotalprice]=useState(0)
    const[amounttoggle,setAmounttoggle]=useState(true);
    const sessionid = Getid();
    const StripePromise=loadStripe('pk_test_51Oh2pcSBHW6gy99XWow4vMxMPdW5yxYNe34HQLprc3tJVy8lrG11ZcmFX3e1xdrydF2IJ0kl39D3c7w3R2YuOye4000rFydFn6')
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
      function PaymentForm() {
        const stripe = useStripe();
        const elements = useElements();
        const [totalPrice, setTotalPrice] = useState(0);
      }
      const calculateTotalPrice = () => {
        let totalPrice = 0;
    
        order.forEach((data) => {
          totalPrice += data.product.price * data.quantity
        });
        return totalPrice;
        
      };
      const amountclick=()=>{
        if(amounttoggle==true){
          setAmounttoggle(false);
        }
        else{
          setAmounttoggle(true);
        }
      }
      const handlepayment=async()=>{
        const stripe=await StripePromise;

        const paymentmethod= await
        stripe.createPaymentMethod({
          type:'card',
          card:'4325464',
          
        });
        const responce=await
        axios.post('/create-payment-intent',{
          paymentmethod:paymentmethod.id,
          amount:calculateTotalPrice()*100,
        });
        console.log(responce);
      }
     
    return(
       <section className="Sectionp">
        <div className="Pcontainer">
        <h1>Payment Details</h1>
        
        <div className="orders">
        </div>
        <div className="orderdetails">
        <Elements stripe={StripePromise}>
          <PaymentForm />
        </Elements>
          </div>
          <div className="amountpay2">
          <h5>Amount Payable</h5><span className="totalmoney">₹{calculateTotalPrice()}</span>
        <span onClick={amountclick} className="totalmoneyA"><MdKeyboardArrowDown /></span>
          </div>
          <div className="amountpay">
        
        {amounttoggle==false &&
        <div className="amountsub">
        {order.map((data)=>(
          <div>
          <h6>{data.product.name}</h6>
          <p className="price">₹{data.product.price}</p> 
          </div>
        ))}
        </div>}
        <button className="paybutton">Pay Now</button>
        </div>
        
          </div>
       </section>
    )
}