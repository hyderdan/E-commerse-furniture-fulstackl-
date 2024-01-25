import { useContext } from "react"
import mydata from "./Context"
import './Style/Rviewed.css'
import Header from "./Header"
import { useEffect } from "react"
import Getid from "./session"
import axios from "axios"

export default function Rviewd(){
   const {recently,setrecently,setrecentsub,recentsub}=useContext(mydata);
   const userid=Getid();
   useEffect(()=>{
    fetchrecent();
  },[]);

   const fetchrecent = async()=>{
    try{
    const response = await axios.get(`http://localhost:5000/users/recent/2/${userid}`);
    const datas =response.data;
   
    setrecently(datas.recentview);
   
    console.log("onlyidincart",recently);
  }
catch(err){
console.log(err);
}
}  

    return(
        <div>
           <Header/>
           <h1 className="vfirstdiv">Recently Viewed</h1>
           <p className="fifv">________________________</p>
        <div className="vthirddiv">         
        {recently.map((data)=>(
            <div  className="vthirdsub">               
           <img className="vthirdimg" src={data.image} alt="img" /> 
           <div className="vthirdmini">
           <h6>{data.name}</h6>
           <p>{data.description}</p>
           <p>₹{data.price}</p>
           </div>
          
            </div>
        ))}
        </div>
        </div>
    )
}