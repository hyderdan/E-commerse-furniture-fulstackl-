import "./Style/Adminlogin.css"
import{RiAdminFill}from "react-icons/ri"
import{AiOutlineLogin}from "react-icons/ai"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import mydata from "./Context";
import axios from "axios";
 export default function Adminpanellogin(){
  const nav=useNavigate()
 const{token1, settoken1}=useContext(mydata)
  const [emAil, setemAil] = useState("");
  const [pass, setpass] = useState("");
 
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        {
          emAil,
          pass,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log("response.data adminlogin", response.data);

      if (data.token) {
        // Set the token in the state
        settoken1(data.token);
        sessionStorage.setItem("admintoken",data.token);
        console.log("token in frontEnd", data.token);
        console.log("Login successful", data.message);
        alert("Welcome Admin");
        nav("/admin");
      } else {
        console.error("Token not found in response");
        alert("Invalid response from the server");
      }
    } catch (error) {
      console.error("Login failed", error.message);
      alert("Invalid Email or Password");
    }
  };

    return(

        <div className="admaindiv">
     <div className="adsub1">
      <img src="https://i.pinimg.com/736x/74/d4/19/74d4198cdb76b42bcac3eb5340dc97f2.jpg" alt="" />
      <div className="adsub2">
          <h1><RiAdminFill/></h1>
          <input value={emAil} onChange={(e)=>setemAil(e.target.value)} className="adform" type="text" name="username" placeholder="username" />
          <input className="adform2" value={pass} onChange={(e)=>setpass(e.target.value)}  name="username" type="password" placeholder="password" />
      <button onClick={()=>handleLogin()}><AiOutlineLogin/></button>  
      </div>
     </div> 



    
   </div>
    )
}