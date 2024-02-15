import "./Style/Admin.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from "react";
import { useContext } from "react";
import mydata from "./Context";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { useEffect } from "react";

export default function Adminlogin() {
  const { users, setUsers, setIslogedin } = useContext(mydata);
  const [Userdetails, setUserdetails] = useState(false);
  const[BAN,SetBAN]=useState("ban")
  const [useindex, setuserindex] = useState(-1);
  const [changepass, setchangepass] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status,Setstatus]=useState("")
  const nav = useNavigate();

  function handlesubmit() {
    setUserdetails(true);

  }
  function handlesubmit2() {
    setUserdetails(false);
  }
  function handlesubmit3() {
    nav("/Aaddproducts")
  }
  function handlesubmit4() {
    nav("/Aproductsdetail")
  }
   useEffect(()=>{
    fectuser();
  },[])

  const fectuser= async()=>{
    const responce= await axios.get('http://localhost:5000/users');
    setUsers(responce.data);
    Setstatus(responce.data.status);

  }
  const deleteuser = async (_id,banuser) => {
      try {
        await axios.put(`http://localhost:5000/users/${_id}`,{banuser});
         fectuser();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }

  
  const handledit = (index) => {
    setchangepass({ ...users[index] });
    setuserindex(index);
  };
  // const handlesave = (index) => {
  //   const updatepass = [...users];
  //   updatepass[index] = { ...changepass };
  //   setUsers(updatepass);
  //   setuserindex(-1);
  //   setIslogedin(false)
  // }
  const adminlogout = () => {
    sessionStorage.clear("admintoken");
    nav("/");
  }
  console.log("hey",users);
  console.log("s",status);
  return (
    <div className="panelmain">
      <div className="panelsub2">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand  ><h4 className="adname">Hello Admin</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => handlesubmit()}>User Details</Nav.Link>
                <Nav.Link onClick={() => handlesubmit3()} >Add Ptoducts</Nav.Link>
                <Nav.Link onClick={() => handlesubmit4()} >Products Details</Nav.Link>
                <Nav.Link onClick={() => handlesubmit2()}>Dashboard</Nav.Link>
                <Nav.Link onClick={() => adminlogout()}>Logout<IoMdLogOut /></Nav.Link>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="panelsub3">
        {Userdetails === true ?
          <div>
            <table className='table table-striped '>
              <thead className='table-primary'>
                <tr>

                  <th>Username</th>
                  <th>Email</th>
                  <th>Action1</th>
                  <th>Action2</th>
                </tr>
              </thead>
              <tbody>

                {users.map((item, index) => (
                  <tr >
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.status=="ban"?<button>Unban</button>:<button onClick={() => deleteuser(item._id,BAN)} className='table-btn' >BAN</button>}</td>
                    <td> <button onClick={() => handledit(index)} className='table-btn' >Edit</button></td>

                  </tr>
                ))}

              </tbody>
            </table>


          </div>
          :
          <div><h1>welcome</h1></div>
        }
      </div>
    </div>
  )

}