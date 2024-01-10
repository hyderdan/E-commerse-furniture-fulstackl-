import { useContext } from "react";
import { useState } from "react";
import mydata from "./Context";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Style/LOgin.css"
import axios from "axios";
// import { useEffect } from "react";
// import axios from "axios";


export default function Login1() {
  const { users, islogedin, setIslogedin, setlogin, login, token, settoken } = useContext(mydata);
  const [credentials, setCredentials] = useState("");
  const [credentials2, setCredentials2] = useState("");

  const Nav = useNavigate();
  function logout() {
    setlogin(true);
    Nav('/')

  }
  // const fectdata = async ()=>{
  //   const responce = await axios.get('http://localhost:5000/users');
  //   setUsers(responce.data);

  // }


  // useEffect(()=>{
  //   fectdata();
  // },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register/login",
        {
          email: credentials,
          password: credentials2,
        },
        {

          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(response.data);
      console.log("token in frontEnd", data.token);
      console.log("Login successful", data.message);
      settoken(data.token)
      alert("Login Success!!!!");
      Nav("/");
      setlogin(false);
    } catch (error) {
      console.log(error.response.data);
      alert("Registration failed!!!");
    }
  };

  return (

    <form>
      {login === true ?
        <div className='main01'>
          <div className='sub1'>
            <h1 className="subh2" > User Login</h1>
            <div className="form1">
              <div className="form-group1">
                <label htmlFor='email' />
                <input className="formname1" value={credentials} onChange={(e) => { setCredentials(e.target.value) }} type='text' name='email' placeholder='Enter your email'></input>
              </div>
              <div className="form-group1">
                <label htmlFor='password' />
                <input className="formname1" value={credentials2} onChange={(e) => { setCredentials2(e.target.value) }} type='password' name='Password' placeholder='Enter your password'></input>
              </div>
              <button onClick={handleSubmit} className='signup-button1'>Login</button>
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
