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
  const sessionid = Getid();
  const sessiontoken = Gettoken();

  const { Addtokart, Setaddtokart, Setcount1, Count1, Userlogin, Cartproducts, setCartproducts
  } = useContext(mydata);
  const [quandity, setquandity] = useState([])

  useEffect(() => {
    fetchcart();

  }, []);

  const fetchcart = async () => {
    try {


      const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {})
      setCartproducts(response.data.products)
      Setcount1(response.data.totalquantity);
      console.log("onlyidincart", response.data.products)
      console.log("total", response.data.totalquantity)
    }
    catch (err) {
      console.log(err);
    }
  }
  const increment = async (value_id) => {
    try {
      if (!sessiontoken) {
        console.log("user not authenticated");
      }
      else {
        const response = await axios.post(
          "http://localhost:5000/users/usercart", { value_id, sessionid },

          {
            withCredentials: true,
            headers: {
              Authorization: `${sessiontoken}`,
            },
          }
        );
        console.log(response.data.cart);
        fetchcart();
      }
    } catch (error) {
      alert("Error adding to cart")

      console.error("Error adding to cart:", error);
    }

  };
  const decrement = async (value_id) => {
    try {
      if (!sessiontoken) {
        console.log("user not authenticated");
      }
      else {
        const response = await axios.post(
          "http://localhost:5000/users/usercart/decrement", { value_id, sessionid },

          {
            withCredentials: true,
            headers: {
              Authorization: `${sessiontoken}`,
            },
          }
        );
        console.log(response.data.cart);
        fetchcart();
      }
    } catch (error) {
      alert("Error adding to cart")

      console.error("Error adding to cart:", error);
    }

  };
  const deletefromcart = async (delete_id, index) => {
    try {
      if (!sessiontoken) {
        console.log("user not authenticated");
        // nav("/login")
      }
      else {
        const response = await axios.post(
          "http://localhost:5000/users/usercart/delete", { delete_id, index, sessionid },
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

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    Cartproducts.forEach((data) => {
      totalPrice += data.product.price * data.quantity
    });

    return totalPrice;
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
        {Cartproducts.map((data, index) => (
          <div className="cartsubdivmini">
            <div onClick={() => deletefromcart(data._id, index)} className="cartsubdivmini3"><AiOutlineClose /></div>
            <img className="subdiv4img" src={data.product.image} alt="" />
            <h5>{data.product.name}</h5>
            <h6>{data.product.description}</h6>
            <p>You can cancel your order before shipped,<br />
              and a full refund will be initiated.</p>
            <div className="quant">
              <Link className="incdcr"><div onClick={() => increment(data.product._id)} className="p1" >+</div></Link>
              <h5>{data.quantity}</h5>
              <Link className="incdcr"><div onClick={() => decrement(data.product._id,)} className="p2">-</div></Link>
            </div>


            <div className="cartsubdivmini2" >₹{data.product.price * data.quantity}</div>
          </div>
        )
        )
        }
      </div>
      <div className="totalpayment">
        <h4>₹{calculateTotalPrice()}</h4>
        <h3>Total Amount</h3>
        <button >Buy NOW</button>
      </div>
    </div>
  )

}