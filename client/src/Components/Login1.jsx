import { useContext } from "react";
import { useState } from "react";
import mydata from "./Context";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Style/LOgin.css"
import axios from "axios";
import Gettoken from "./sessiontoken";
// import { useEffect } from "react";



export default function Login1() {
  const { setlogin,Setcount1, Setcount, settoken,setuselogin, } = useContext(mydata);
  const [email, setemail] = useState("");
  const [password, setpassw] = useState("");
 
  // const[_, setCookies]=useCookies(["access_token"])
  const Nav = useNavigate();
  const sessiontoken=Gettoken();
  function logout() {
    sessionStorage.clear("usertoken")
    sessionStorage.clear("userid")
    Nav('/');
    setuselogin([]);
    Setcount(0);
    Setcount1(0);
    
  }
  
  console.log(email,password)
  const Login = async (e) => {
    e.preventDefault();
   
               
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
        // const fechuser=users.filter((d)=>
        // d.email===email
        // );
        // // setuselogin(fechuser); 
        // setCartid(fechuser[0].cart);     
        const data = response.data;
        console.log(response.data);
        console.log("token in frontEnd", data.token);
        console.log("Login successful", data.message);
        settoken(data.token);
        sessionStorage.setItem('usertoken',data.token);
        sessionStorage.setItem('userid',data.UserID);
       
          
        alert("Login Success!!!!");
        Nav("/");
       
        setlogin(false);
       
        
       
       
        
       
        // setCartid(fechuser.cart);
        // setCartid(email);
        // console.log("ll",fechuser);
        // console.log("fech",Cartid)

    } catch (error) {
        console.log(error.response.data);
        alert("Registration failed!!!");
    }
   
};

 

  return (

    <form>
      {!sessiontoken ?
        <div className='main01'>
          <div className='sub1'>
            <h1 className="subh2" > User Login</h1>
            <div className="form1">
              <div className="form-group1">
                <label htmlFor='email' />
                <input className="formname1" value={email} onChange={(e) => { setemail(e.target.value) }} type='text' name='email' placeholder='Enter your email'></input>
              </div>
              <div className="form-group1">
                <label htmlFor='password' />
                <input className="formname1" value={password} onChange={(e) => { setpassw(e.target.value) }} type='password' name='Password' placeholder='Enter your password'></input>
              </div>
              <button onClick={Login} className='signup-button1'>Login</button>
              <p>
                Don't have an account <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
        :
        <div>
          <h1>you have already logged in</h1>
          <button onClick={() => logout()}>logout</button>
        </div>
      }
    </form>

  )
}
