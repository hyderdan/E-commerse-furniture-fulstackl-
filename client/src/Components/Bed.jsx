import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import mydata from "./Context"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown';
import "./Style/Bed.css"
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import Footer from "./Footer";
import { Link } from "react-router-dom";


export default function Bed(){
  const navigate=useNavigate();
    const{Sofadata,Productdetail,Setproductdetail,Productdetail1,Setproductdetail1,Count,Setcount
    ,recently,setrecently,
    setrecentsub,recentsub,}=useContext(mydata)

    const beds=Sofadata.filter((data)=>
    data.item==="bed"
    );

    function viewproducts(value){
      if(Productdetail.includes(value)){
        Setproductdetail(Productdetail.filter((d)=>d!==value))
        Setcount(Count-1)
    }
    else{
      const products=value;
      Setproductdetail([...Productdetail,products]);
      console.log(Productdetail)
      Setcount(Count+1)
      
    } 
  }
  
    function productsdetails(value){
      const products=value;  
      recentsub.splice(3,3)
      setrecently([...recently,products]);
      setrecentsub([...recentsub,products])  
    }


    return(
        <div>
      <div><Header/></div>
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
      <Dropdown.Toggle  className="btogle2" >color</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1"></Dropdown.Item>
        <Dropdown.Item href="#/action-2"></Dropdown.Item>
        <Dropdown.Item href="#/action-3"></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>


        <div className="bthirddiv"> 
        {beds.map((data)=>(
           <Link className="Hlink" to={`/productdetails/${data._id}`}>
            <div  className="bthirdsub">
               <div onClick={(e)=>{viewproducts(data);e.preventDefault()}} className="bbutton2">
          {Productdetail.includes(data)?<h5 className="bbuttonsub"><AiFillHeart/></h5>:<h5><AiOutlineHeart/></h5>}</div>    
           <img className="bthirdimg" src={data.image} alt="img" /> 
           <div className="bthirdmini">
           <h6>{data.name}</h6>
           <p>₹{data.price}</p>
           <button onClick={()=>productsdetails(data)} className="bbutton1">View Product</button>
           </div>
            </div>
            </Link>
        ))}
        </div>
        <div> <Footer/></div>
       
 </div>
    )
}