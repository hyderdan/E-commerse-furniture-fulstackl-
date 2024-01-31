import { useState } from "react"
import { useContext } from "react";
import mydata from "./Context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Style/Register.css"
import { useNavigate } from "react-router-dom";

export default function Loginpage(){
    
   const emailcheck=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const { users, setUsers } = useContext(mydata);
      const [bug,setBug]=useState([])
      const [userid, setuserid] = useState("");
      const [userpass, setuserpass] = useState("");
      const [useremail, setuseremail] = useState("");
      const [confirmpassword, setconfirmpassword] = useState("");
      const nav=useNavigate();
    
      // const fectdata = async ()=>{
      //   const responce = await axios.get('http://localhost:5000/users');
      //   setUsers(responce.data);
       
      // }
      console.log(users)
      const handleSubmit =async(e)=>{ 
        e.preventDefault();
        const handleerror={}

        // Add your signup logic here
        if (!userid){
          handleerror.userid='This Field is Required'
        }
        if(!useremail ){
          handleerror.useremail='This Field is Required'
        }
        else if(!emailcheck.test(useremail)){
          handleerror.useremail="invalid email"
        }  
        if(!userpass){
          handleerror.userpass='This field is Required'
        }else if(userpass<6){
          handleerror.userpass='min 6 char'
        }
        if(!confirmpassword){
          handleerror.confirmpassword='This Field is Required'
        } 
        setBug(handleerror)
        if(Object.keys(handleerror).length===0){    
        // If the user data is valid, add the user to the users array 
        try{
         const responce= await axios.post('http://localhost:5000/users/register',{username:userid,email:useremail,password:userpass
        ,confirmPassword:confirmpassword},
          (req, res) => console.log(req.body));
          // fectdata();  
          if (responce.status === 202) {
            alert('Registration successful');
            nav('/');
        } else {
            alert('Registration failed');
        }
        setuserid("");
        setuseremail("");
        setuserpass("");
        setconfirmpassword("");
    } catch (error) {
        console.log(error.response.data);
        alert('Registration failed');
    }
       
      }
       }
       
      
    
   
    return(
            <form>
          <div className="main">
      <div className="sub">
            <h1 className="subh1">Registration Form</h1>
           <div className="form">
          <div className="form-group">
             <label htmlFor="username"/>
             {bug.userid&&<span className="sp">{bug.userid}</span>}
         <input className="formname"  value={userid} onChange={(e)=>{setuserid(e.target.value)}} name="Username" type="text"  placeholder="Enter Your User Name"/>
        
         </div>
        <div className="form-group">
        <label htmlFor="email"/>
        {bug.useremail&&<span className="sp">{bug.useremail}</span>}
        <input className="formname" value={useremail} onChange={(e)=>{setuseremail(e.target.value)}} name="email" type="email"   placeholder="Enter email Address"/>
        
            </div>
           <div className="form-group">
           <label htmlFor="password"/>
           {bug.userpass&&<span className="sp">{bug.userpass}</span>}    
           <input className="formname" value={userpass} onChange={(e)=>{setuserpass(e.target.value)}} type="password" name="password" placeholder="Enter Your Password"/>
           
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"/>
              {bug.confirmpassword&&<span className="sp">{bug.confirmpassword}</span>}
         <input className="formname" value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}}  type="password"   name="confirmPassword"  placeholder="Confirm Password" />
         
            </div>
            <button  onClick={handleSubmit} className="signup-button">
              Sign Up
            </button>
            <p>Already have an account? <Link to="/login">Login</Link></p>              
            </div>
            </div>
          </div>
        </form>
        );
    }
  
        