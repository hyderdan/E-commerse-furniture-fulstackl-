import "./Style/Admin.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from "react";
import { useContext } from "react";
import mydata from "./Context";
import { useNavigate } from "react-router-dom";


export  default function Adminlogin(){
    const {users, setUsers,setIslogedin}=useContext(mydata);
  const [Userdetails,setUserdetails]=useState(false);
  const[useindex,setuserindex]=useState(-1);
  const[changepass,setchangepass]=useState({
         username: "",
         email: "",
         password: "",
         confirmPassword: "",
  })
  const nav=useNavigate();

    function handlesubmit(){
        setUserdetails(true);

    }
    function handlesubmit2(){
        setUserdetails(false);
    }
    function handlesubmit3(){
      nav("/Aaddproducts")
    }
    function handlesubmit4(){
      nav("/Aproductsdetail")
    }
const deleteuser=(data)=>{
  const dele=users.filter((d)=>{return(d!==data)});
  setUsers(dele);
  setIslogedin(false)

}
const handledit=(index)=>{
  setchangepass({...users[index]});
  setuserindex(index);
};
const handlesave=(index)=>{
  const updatepass=[...users];
  updatepass[index]={...changepass};
  setUsers(updatepass);
  setuserindex(-1);
  setIslogedin(false)
}

    return(
    <div  className="panelmain">
    <div className="panelsub2">
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand  ><h4 className="adname">Hello Admin</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={()=>handlesubmit()}>User Details</Nav.Link>
            <Nav.Link  onClick={()=>handlesubmit3()} >Add Ptoducts</Nav.Link>
            <Nav.Link  onClick={()=>handlesubmit4()} >Products Details</Nav.Link>
            <Nav.Link  onClick={()=>handlesubmit2()}>Dashboard</Nav.Link>           
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>         
    </div>

    <div className="panelsub3">
        {Userdetails=== true ?
      <div>
      <table className='table table-striped '>
       <thead className='table-primary'>
       <tr>
        
        <th>Username</th>
        <th>Email</th>
        <th>Password</th>
        <th>Action1</th>
        <th>Action2</th>
       </tr>
       </thead>
       <tbody>
      
        {users.map((item,index)=>(             
     <tr >
     <td>{item.username}</td> 
     <td>{item.email}</td>
     <td key={index}>{useindex==index?(
      <div>
      <input value={changepass.password}  onChange={(e)=>setchangepass({...changepass,password:e.target.value})} type="text" />
      <button onClick={()=>handlesave(index)}>save</button>   
      </div>
       ):(
     <div>{item.password}</div> 
     )}</td>        
     <td> <button onClick={()=>deleteuser(item)} className='table-btn' >Delete</button></td>   
     <td> <button onClick={()=>handledit(index)} className='table-btn' >Edit</button></td>   
    
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