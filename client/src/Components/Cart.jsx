import Header from "./Header";
import "./Style/CArt.css"
import { BiSolidOffer } from "react-icons/bi"
import { useContext } from "react";
import { useEffect } from "react";
import mydata from "./Context";
import { AiOutlineClose } from "react-icons/ai"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Getid from "./session";
import Gettoken from "./sessiontoken";



export default function Cart() {
    const nav = useNavigate();
    const sessionid=Getid();
    const sessiontoken=Gettoken();
    
    const { Addtokart, Setaddtokart, Setcount1, Count1, Userlogin, Cartproducts, setCartproducts
    } = useContext(mydata);
    const [cart,setcart]=useState([])
    
    useEffect(() => {
        fetchcart();
        }, []);
       
        const fetchcart = async()=>{
            try{

            
            const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`)
            setCartproducts(response.data.products)
            console.log("onlyidincart",response.data.products)
          }
    catch(err){
        console.log(err);
    }
    }  
    const deletefromcart=async(delete_id,index)=>{
        try {
          if(!sessiontoken){
            console.log("user not authenticated");
            // nav("/login")
          }
          else{
          const response = await axios.post(
            "http://localhost:5000/users/usercart/delete",{delete_id,index,sessionid}, 
            {
              withCredentials: true,
              headers: {
                Authorization: `${sessiontoken}`,
              },
            }
          );
              console.log(response.data.cart);
              fetchcart();
            //   setSavedcart(response.data.cart);
            //   setcartindex(false);
        //   alert(response.data.message); 
          
        }
        } catch (error) {
          alert("Error adding to cart")
        
          console.error("Error adding to cart:", error);
        }
        
      };
      
    
   
   
    //   console.log(productfilter);
   

    // const cartless = (id) => {


    //     const remove = Cartproducts.filter((data) => data.id !== id
    //     );
    //     setCartproducts(remove)
    //     Setcount1(Count1 - 1)
    // }

    //    function priceinc(d){
    //     const price=d.price
    //    }
    const Increment = (_id) => {
        const newinc = Cartproducts.map((data) =>
            data._id ===_id ? { ...data, quandity: data.quandity + 1 } : data);
        setCartproducts(newinc);

    }
    const decrement = (id) => {
        const newdec = Cartproducts.map((data) =>
            data._id === id && data.quandity > 1 ? { ...data, quandity: data.quandity - 1 } : data);
        setCartproducts(newdec)
    }

    const totalamount = () => {
        return Cartproducts.reduce((a, b) => a + b.price * b.quandity, 0);
    };
    const buttonclick = () => {
        nav("/payment")
    }

    return (

        <div className="cartmaindiv">
            <Header />
            <div className="cartsubdiv1">
                <h1>ADD TO CART</h1>
            </div>
            <div className="cartsubdiv2">
                <h4><BiSolidOffer /></h4><h6>Available Offers</h6>
                <p>Add items worth ₹5,479 more to avail No Cost EMIs on Credit Cards! </p>
            </div>
            <div className="cartsubdiv3">
                <p className="subdiv3p1">Products</p>
                <p className="subdiv3p2">Delivery Date</p>
                <p className="subdiv3p3">Quantity</p>
                <p className="subdiv3p4">Total</p>
            </div>
            <div className="cartsubdiv4">
                {Cartproducts.map((data,index) => (

                    <div className="cartsubdivmini">
                        <div onClick={() => deletefromcart(data._id,index)} className="cartsubdivmini3"><AiOutlineClose /></div>

                        <img className="subdiv4img" src={data.image} alt="" />
                        <h5>{data.name}</h5>
                        <h6>{data.description}</h6>
                        <p>You can cancel your order before shipped,<br />
                            and a full refund will be initiated.</p>
                        <div className="quant">
                            <Link className="incdcr"><div onClick={() => Increment(data._id)} className="p1" >+</div></Link>
                            <h5 >{data.quandity}</h5>
                            <Link className="incdcr"><div onClick={() => decrement(data._id)} className="p2">-</div></Link>
                        </div>


                        <div className="cartsubdivmini2" >₹{data.price * data.quandity}</div>
                    </div>
                )
                )
                }
            </div>
            <div className="totalpayment">
                <h4>₹{totalamount()}</h4>
                <h3>Total Amount</h3>
                <button onClick={() => buttonclick()}>Buy NOW</button>
            </div>
        </div>
    )

}