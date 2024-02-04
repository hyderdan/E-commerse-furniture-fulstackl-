import "./Style/Loginreg.css";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useContext } from "react";
import { useState } from "react";
import mydata from "./Context";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import Gettoken from "./sessiontoken";

export default function Loginandreg(){

    const { setlogin,settoken,users, setUsers} = useContext(mydata);

    const emailcheck=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const[isSignup,setIssignUp]=useState(false);
    const [email, setemail] = useState("");
    const [password, setpassw] = useState("");
    const [bug,setBug]=useState([])
    const [bug2,setBug2]=useState([])
    const [userid, setuserid] = useState("");
      const [userpass, setuserpass] = useState("");
      const [useremail, setuseremail] = useState("");
      const [confirmpassword, setconfirmpassword] = useState("");
      const [formSubmitted, setFormSubmitted] = useState(false);
      const [formSubmitted2, setFormSubmitted2] = useState(false);
    const Nav = useNavigate();
  const sessiontoken = Gettoken();
  console.log(email, password)
  
  
  const Login = async (e) => {
    e.preventDefault();
    if ( !email || !password ) {
        // If any field is empty, set formSubmitted to true
        setFormSubmitted2(true);
      } else {
        // Submit the form
        // Reset formSubmitted
        setFormSubmitted2(false);
      }
      const handleerror={}
     
      if(!email ){
        handleerror.useremail='This Field is Required'
      }
 
      if(!password){
        handleerror.userpass='This field is Required'
      }
      setBug2(handleerror);
      if(Object.keys(handleerror).length===0){  
    try {
      const response = await axios.post(
        'http://localhost:5000/users/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(response.data);
      console.log("token in frontEnd", data.token);
      console.log("Login successful", data.message);
      settoken(data.token);
      sessionStorage.setItem('usertoken', data.token);
      sessionStorage.setItem('userid', data.UserID);


      alert("Login Success!!!!");
      Nav("/");
    } catch (error) {
        console.log(error.response.data);
        alert("Registration failed!!!");
      }
    }
}
  


    const handleSubmit =async(e)=>{ 
        e.preventDefault();

        if (!userid || !useremail || !userpass || !confirmpassword) {
            // If any field is empty, set formSubmitted to true
            setFormSubmitted(true);
          } else {
            // Submit the form
            // Reset formSubmitted
            setFormSubmitted(false);
          }
          const handleerror={}
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
    const handlereg=()=>{
        setIssignUp(true);
    }
    const handlelogin=()=>{
        setIssignUp(false);
    }
    return(
        <div className="loginmaindiv">
        <div className={`containeR ${isSignup?'active':''}`}>
        <div className="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><FaGoogle /></a>
                    <a href="#" className="icon"><FaFacebook /></a>
                    <a href="#" className="icon"><IoLogoInstagram /></a>
                    <a href="#" className="icon"><FaSquareXTwitter /></a>

                </div>
                <span>or use your email for registeration</span>
                <input className={`${!formSubmitted?'':'userplace'}`} value={userid} onChange={(e)=>{setuserid(e.target.value)}} type="text" placeholder={`${!formSubmitted?'Name':'This filed required'}`} />
                <input className={`${!formSubmitted?'':'userplace'}`} value={useremail} onChange={(e)=>{setuseremail(e.target.value)}} type="email"placeholder={`${!formSubmitted?'Email':'This filed required'}`}/>    
                <input className={`${!formSubmitted?'':'userplace'}`} value={userpass} onChange={(e)=>{setuserpass(e.target.value)}} type="password"placeholder={`${!formSubmitted?'Password':'This filed required'}`}/>
                <input className={`${!formSubmitted?'':'userplace'}`} value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}} type="password" placeholder={`${!formSubmitted?'confirmPassword':'This filed required'}`} />
                <button  onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
        <div className={`form-container sign-in ${isSignup?'':'hidden'}`}>
            <form>
                <h1>Sign In</h1>
                <div class="social-icons">
                <a href="#" className="icon"><FaGoogle /></a>
                    <a href="#" className="icon"><FaFacebook /></a>
                    <a href="#" className="icon"><IoLogoInstagram /></a>
                    <a href="#" className="icon"><FaSquareXTwitter /></a>
                </div>
                <span>or use your email password</span>
                <input className={`${!formSubmitted2?'':'userplace'}`} value={email} onChange={(e) => { setemail(e.target.value)}} type="email" placeholder={`${!formSubmitted2?'Email':'This filed required'}`}/>
                <input className={`${!formSubmitted2?'':'userplace'}`} value={password} onChange={(e) => { setpassw(e.target.value) }} type="password" placeholder={`${!formSubmitted2?'Password':'This filed required'}`}/>
                <a href="#">Forget Your Password?</a>
                <button onClick={Login} >Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className={`toggle-panel toggle-left ${isSignup?'':'hidden'}`}>
                    <h1>Welcome Back !</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login" onClick={()=>handlelogin()}>Sign In</button>
                </div>
                <div className={`toggle-panel toggle-right ${isSignup?'hidden':''}`}>
                    <h1>Welcome, Friend!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="register" onClick={()=>handlereg()}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}