import './Style/Wishlist1.css'
import { useContext } from "react";
import mydata from "./Context";
import{AiOutlineHeart}from "react-icons/ai"
import{AiFillHeart}from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';


export default function Wishlist(){
    
    function viewproducts(value){
        if(Productdetail.includes(value)){
          Setproductdetail(Productdetail.filter((d)=>d!==value))
          Setcount(Count-1)
      }
      else{
        const products=value;
        Setproductdetail([...Productdetail,products]);
        console.log(Productdetail)
      } 
    }
    function productsdetails(value){
        const products=value;
        Productdetail1.splice(0,1);
        Setproductdetail1([...Productdetail1,products]); 
        // console.log(Productdetail)
        navigate('/productdetails')
        
          
      }
      const navigate=useNavigate();
      const{Productdetail,Setproductdetail,Productdetail1,Setproductdetail1,Count,Setcount,}=useContext(mydata)
    console.log(Productdetail)
     return(
     <div className="wishmain">
        <div><Header/></div>
        <div className="wishsub1">
        <h5>My Wishlist</h5>
        <div className="wthirddiv">
         
         {Productdetail.map((data)=>(
             <div  className="wthirdsub">
                <div onClick={()=>viewproducts(data)} className="wbutton2">
                {Productdetail.includes(data)?<h5 className="wbuttonsub"><AiFillHeart/></h5>:<h5><AiOutlineHeart/></h5>}</div>
               
            <img className="wthirdimg" src={data.image} alt="img" /> 
            <div className="wthirdmini">
            <h6>{data.name}</h6>
            <p>{data.description}</p>
            <button onClick={()=>productsdetails(data)} className="wbutton1">View Product</button>
            
            </div>
           
             </div>
         ))}
         </div>
        </div>
        <div className='wfooter'>  
            <Footer/>       
        </div>
        </div>
     );
        }

