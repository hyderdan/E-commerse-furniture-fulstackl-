import "./Style/Adminlogin.css"
import{RiAdminFill}from "react-icons/ri"
import{AiOutlineLogin}from "react-icons/ai"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import mydata from "./Context";

 export default function Adminpanellogin(){
  const nav=useNavigate()
 const{admin}=useContext(mydata)
  const [useradmin, setuseradmin] = useState({
    username: "",
    password: "",
  });
 const handleChange=(d,f)=>{
          setuseradmin({...useradmin,[d]:f});
          console.log(useradmin)
  }
  function handleSubmit(){
    // e.preventDefault();
    // const pass=admin.find((d)=>
    // d.username===useradmin.password.username&&
    // d.password===useradmin.password
    // );
    if (useradmin.password===admin.password&&useradmin.username===admin.username) {      
      alert("Login successful");
      nav("/admin")
  
    } else {
      alert("Invalid username or password");
    }
  }

    return(

        <div className="admaindiv">
     <div className="adsub1">
      <img src="https://i.pinimg.com/736x/74/d4/19/74d4198cdb76b42bcac3eb5340dc97f2.jpg" alt="" />
      <div className="adsub2">
          <h1><RiAdminFill/></h1>
          <input value={useradmin.username} onChange={(e)=>handleChange("username",e.target.value)} className="adform" type="text" name="username" placeholder="username" />
          <input className="adform2" value={useradmin.password} onChange={(e)=>handleChange("password",e.target.value)}  name="username" type="password" placeholder="password" />
      <button onClick={()=>handleSubmit()}><AiOutlineLogin/></button>  
      </div>
     </div> 



    
   </div>
    )
}