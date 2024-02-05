import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import mydata from "./Context"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown';
import "./Style/Bed.css"
import { AiOutlineHeart } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Gettoken from "./sessiontoken";
import Getid from "./session";
import axios from "axios";
import { toast } from "react-toastify";



export default function Bed() {
  const navigate = useNavigate();
  const sessiontoken = Gettoken();
  const userid = Getid();
  const { Sofadata, setwishliststatus, wishliststatus,Setcount} = useContext(mydata)

  const beds = Sofadata.filter((data) =>
    data.item === "bed"
  );
  useEffect(() => {
    // fechwishlist();
    fechrecentlyviewed();
    totalwishquand();
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
        // alert(response.data.message);
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

      // const productInWishlist = wishlistItems.find(item => item.product._id === );
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
      <div className="bfirstdiv">
        <h1>Bed</h1>
        <p>Often a good night's sleep is credited to the type of mattress you invest in, but a quality bed frame plays an equally important role as well . </p>
      </div>
      <div className="bseconddiv">
        <p>Filter</p>
        <Dropdown className="bdropdown1">
          <Dropdown.Toggle className="btogle1" > Price</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1"></Dropdown.Item>
            <Dropdown.Item href="#/action-2"></Dropdown.Item>
            <Dropdown.Item href="#/action-3"></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="bdropdown2">
          <Dropdown.Toggle className="btogle2" >color</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1"></Dropdown.Item>
            <Dropdown.Item href="#/action-2"></Dropdown.Item>
            <Dropdown.Item href="#/action-3"></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>


      <div className="bthirddiv">
        {beds.map((data) => (
          <Link className="Hlink" to={`/productdetails/${data._id}`}>
            <div onClick={() => recntlyviewed(data._id)} className="bthirdsub">
              <div onClick={(e) => { wishlisted(data._id);e.preventDefault()}} className="bbutton2">
                {wishliststatus.includes(data._id) ? <h5 className="bbuttonsub"><AiFillHeart /></h5> : <h5><AiOutlineHeart /></h5>}</div>
              <img className="bthirdimg" src={data.image} alt="img" />
              <div className="bthirdmini">
                <h6>{data.name}</h6>
                <p>₹{data.price}</p>
                <button className="bbutton1">View Product</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div> <Footer /></div>

    </div>
  )
}