import { Link } from "react-router-dom";
 import  "./Style/Home.css"
 import Carousel from 'react-bootstrap/Carousel';
import Header from "./Header";
import {BiSolidOffer} from "react-icons/bi"
import {LiaStoreAltSolid} from "react-icons/lia"
import {LuSofa} from "react-icons/lu"
import {BiBed} from "react-icons/bi"
import {MdOutlineBreakfastDining} from "react-icons/md"
import {GiHanger} from "react-icons/gi"
import {LuArmchair} from "react-icons/lu"
import {MdChairAlt} from "react-icons/md"
import {GiTable} from "react-icons/gi"
import {GiConverseShoe} from "react-icons/gi"
import {GiBookshelf} from "react-icons/gi"
import {GiStreetLight} from "react-icons/gi"
import {BsFillBookmarkStarFill} from "react-icons/bs"
import Footer from "./Footer";
import Sofas from "./Sofas";
import { VscArrowRight } from "react-icons/vsc";
import { useContext } from "react";
import mydata from "./Context";
import axios from 'axios'
import { useEffect } from "react";
import Getid from "./session";

 function Home(){
  const{recentsub,homedata,sethomedata,setrecentsub,}=useContext(mydata);
  console.log(homedata)
  const userid=Getid();
  useEffect(()=>{
    fectdata();
    fetchrecent();
  },[]);
  
  const fectdata = async ()=>{
    const responce = await axios.get('http://localhost:5000/homeimage');
    sethomedata(responce.data);
   
  };
  const fetchrecent = async()=>{
    try{
    const response = await axios.get(`http://localhost:5000/users/recent/${userid}`);
    const datas =response.data;
   
    setrecentsub(datas.recentview);
   
    console.log("onlyidincart",recentsub);
  }
catch(err){
console.log(err);
}
}  
    return(
        <div className="maindiv">
            <div className="firstdiv">
                <p>&nbsp;Full House Sale&nbsp;|&nbsp;Up to 70% off +Extra 10%off&nbsp;|&nbsp;<Link className="link">Click  to Shop!</Link></p>
           </div>

           <Header/>

        <div className="fourthdiv">
            {homedata.map((data)=>(

           
        <Carousel>
        <Carousel.Item >
      <img className="courouselimg" src={data.url[0]} alt="img" />
      </Carousel.Item>
      <Carousel.Item >
      <img className="courouselimg" src={data.url[1]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
      <img  className="courouselimg" src={data.url[2]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
       <img  className="courouselimg" src={data.url[3]} alt="img" />
      </Carousel.Item>
    </Carousel>
     ))}
        </div>
        <div className="sixthdiv">
                <h3 className="rh3">Recently Viewed</h3>
                <p className="rifp">_______________</p>                
               
        <div className="vhomediv">   
              
        {recentsub.map((data)=>(
            <div  className="vhomesub">               
           <img className="vhomeimg" src={data.image} alt="img" /> 
           <div className="vhomemini">
           <h6>{data.name}</h6>
           <p>{data.description}</p>
           <p>₹{data.price}</p>
           </div>
          
            </div>
        ))}
        </div>      
        <Link className="Hlink" to={'/recentlyviewed'}><div className="vround"><VscArrowRight/></div></Link>
        </div>

    <div className="fifthdiv">
     
        <h3 className="fifthsub">Explore Our Furniture Range</h3>
            <p className="fifp">______________________</p>
        

       <div className="fifthmain">

        <div className="main1">
        <Link className="Hlink" to={"dealzone"}><h3><BiSolidOffer/></h3>
            <p>All Products</p></Link>
        </div>
              
       {/* <div className="main2">
       <Link className="Hlink" to={""}><h3><LiaStoreAltSolid/></h3>
            <p>Store</p></Link>
        </div> */}
        
      
        <div className="main3">
        <Link className="Hlink" to={"sofas"}><h3><LuSofa/></h3>
            <p>Sofas</p></Link>
        </div>
       
      
        <div className="main4">
        <Link className="Hlink" to={"bed"}><h3><BiBed/></h3>
            <p>Beds</p></Link>
         </div>
        
       
         <div className="main5">
         <Link className="Hlink" to={"/dining"}><h3><MdOutlineBreakfastDining/></h3>
            <p>Dining</p></Link>
         
        </div>
       
        <div className="main6">
        <Link className="Hlink" to={""}><h3><GiHanger/></h3>
            <p>wardrobe</p></Link>
        </div>
        
        
        <div className="main7">
        <Link className="Hlink" to={""}><h3><LuArmchair/></h3>
            <p>Recliner</p></Link>
        </div>

        <div className="main8">
        <Link className="Hlink" to={""}><h3><MdChairAlt/></h3>
            <p>Seat</p></Link>
        </div>

       <div className="main9">
       <Link className="Hlink" to={""}><h3><GiTable/></h3>
            <p>Table</p></Link>
        </div>

        <div className="main10">
        <Link className="Hlink" to={""}><h3><GiConverseShoe/></h3>
            <p>Shoerack</p></Link>
        </div>

        <div className="main11">
        <Link className="Hlink" to={""}><h3><GiBookshelf/></h3>
            <p>BookShelf</p></Link>
        </div>

        <div className="main12">
        <Link className="Hlink" to={""}><h3><GiStreetLight/></h3>
            <p>Lighting</p></Link>
        </div>
       
        <div className="main13">
        <Link className="Hlink" to={""}><h3><BsFillBookmarkStarFill/></h3>
            <p>Bestseller</p></Link>
        </div>

       

    </div>  
    </div>  
       <div className="sevendiv">
        <Footer/>
       </div>
        </div>

    )
}
export default Home;