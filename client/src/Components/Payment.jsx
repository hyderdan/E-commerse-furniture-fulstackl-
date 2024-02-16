import "./Style/Payment.css";
import mydata from "./Context";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Getid from "./session";
import { MdKeyboardArrowDown } from "react-icons/md";
export default function Payment(){
    const {Cartproducts}=useContext(mydata);
    const[order,setorder]=useState([]);
    const [Totalprice,settotalprice]=useState(0)
    const[amounttoggle,setAmounttoggle]=useState(true);
    const[checkindex,Setcheckindex]=useState(true);
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState('');
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
      const amountclick=()=>{
        if(amounttoggle==true){
          setAmounttoggle(false);
        }
        else{
          setAmounttoggle(true);
        }
      }
//       const checkout=async()=>{
//         if (!stripe || !elements) {
//           console.error('Stripe.js has not loaded yet.');
//           return;
//       }
//       try {
//           const response = await axios.post('http://localhost:5000/payment/create-payment-intent', { amount: calculateTotalPrice() });
//           setClientSecret(response.data.clientSecret);
//           Setcheckindex(false);
//       } catch (error) {
//           console.error('Error during checkout:', error);
//       }
//   };
 
// const handlePayment = async (clientSecret) => {
//   try {
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//           payment_method: {
//               card: elements.getElement(CardElement),
             
//           }
//       });
//       if (paymentIntent.status === 'succeeded') {
//           // Payment successful
//           console.log('Payment successful!');
//       }
//   } catch (error) {
//       console.error('Error processing payment:', error);
//   }
// };
//     const handleSubmit = async (event) => {
//      event.preventDefault();
//      if (!stripe || !elements) {
//       console.error('Stripe.js has not loaded yet.');
//       return;
//       }
//           await handlePayment(clientSecret);
//     };
//     const checkoutopen=()=>{
//       Setcheckindex(true);
//     }

     
    return(
       <section className="Sectionp">
       
        <div className="Pcontainer">
        <h1>Payment Details</h1>
        
        <div className="orders">
        </div>
        <div className="orderdetails">
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
        <button className="paybutton">check out</button>
        </div>
          </div>
          {/* {checkindex==false &&<div className="Checkout">
          <h1>Check out</h1><button onClick={()=>checkoutopen()}>close</button>
          <Elements 
          stripe={StripePromise}
          options={{clientSecret:clientSecret}}>
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={PaymentElementOption} />
            <button disabled={!stripe || !elements} id="submit">Pay Now</button>
           
          </form>
          </Elements>
          </div>} */}
          
       </section>
    )
}