import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import mydata from "./Context"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown';
import "./Style/Sofas.css"
import { AiOutlineHeart } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import Getid from "./session";
import Gettoken from "./sessiontoken";
import axios from "axios";
import { useEffect } from "react";

export default function Dining() {
  const navigate = useNavigate();
  const [index, setindex] = useState(-1)
  const sessiontoken = Gettoken();
  const userid = Getid();




  const { Sofadata, setwishliststatus, wishliststatus, Setcount, } = useContext(mydata);

  const dining = Sofadata.filter((data) =>
    data.item === "dining"
  );

  useEffect(() => {
    totalwishquand();
    fechrecentlyviewed();
  }, []);


  const fechrecentlyviewed = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/recent/idr/${userid}`

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
        navigate("/login")
      }
      else {

        const response = await axios.post(
          "http://localhost:5000/users/recentlyviewed", { value_id, userid },

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
        `http://localhost:5000/users/wishedproduct/idw/${userid}`,

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
          "http://localhost:5000/users/wishlist", { value_id, userid },

          {
            withCredentials: true,
            headers: {
              Authorization: `${sessiontoken}`,
            },
          }
        );

        console.log("wish", response.data.wishlist);
        totalwishquand(value_id);
      }
    } catch (error) {
      alert("Error adding to ")

      console.error("Error adding to cart:", error);
    }

  };
  const totalwishquand = async (value_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/wish/${userid}`, { value_id });
      Setcount(response.data.totalquantity);
      setwishliststatus(response.data.isInWishlist);
      console.log("red", wishliststatus);
      console.log("total", response.data.totalquantity)
    }
    catch (err) {
      console.log(err);
    }
  }




  return (
    <div>
      <div><Header /></div>
      <div className="sfirstdiv">
        <h1>Dining Tables & Chairs</h1>
        <p>The dining table is where the family comes together to share a simple meal at the end of the day, it is also the place to share important news, to celebrate, ...
        </p>  </div>
      <div className="sseconddiv">
        <p>Filter</p>
        <Dropdown className="dropdown1">
          <Dropdown.Toggle className="stogle1" > Price</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1"></Dropdown.Item>
            <Dropdown.Item href="#/action-2"></Dropdown.Item>
            <Dropdown.Item href="#/action-3"></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="dropdown2">
          <Dropdown.Toggle className="stogle2" >color</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">black</Dropdown.Item>
            <Dropdown.Item href="#/action-2">grey</Dropdown.Item>
            <Dropdown.Item href="#/action-3">brown</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>


      <div className="sthirddiv">

        {dining.map((data) => (
          <Link className="Hlink" to={`/productdetails/${data._id}`}>
            <div onClick={() => recntlyviewed(data._id)} className="sthirdsub">
              <div onClick={(e) => { wishlisted(data._id); e.preventDefault() }} className="sbutton2">
                {wishliststatus.includes(data._id) ? <h5 className="sbuttonsub"><AiFillHeart /></h5> : <h5><AiOutlineHeart /></h5>}</div>

              <img className="Sthirdimg" src={data.image} alt="img" />
              <div className="sthirdmini">
                <h6>{data.name}</h6>
                <p>{data.description}</p>
                <p>₹{data.price}</p>
                <button className="sbutton1">View Product</button>

              </div>

            </div>
          </Link>
        ))}
      </div>
      <div> <Footer /></div>
    </div>
  )
}