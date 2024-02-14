import {AiOutlineQuestionCircle} from 'react-icons/ai'
 import{GrLocation} from "react-icons/gr"
 import{FiSearch} from "react-icons/fi"
 import{FaRegUser} from "react-icons/fa"
 import{BsHeart} from "react-icons/bs"
 import{FiShoppingCart} from "react-icons/fi"
 import { Link } from "react-router-dom";
import "./Style/Header2.css"
import { useContext } from 'react'
import mydata from './Context'
import { useNavigate } from 'react-router-dom';
import{BiSolidUpArrow}from "react-icons/bi"
import { IoMdLogOut } from "react-icons/io";
import { useState } from 'react'
import{MdOutlineAdminPanelSettings} from "react-icons/md"
import Gettoken from "./sessiontoken";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import Getid from "./session";
import { useEffect } from 'react';





export default function Header(){
    const{Count,Count1,Setcount,Setcount1,
      setuserProfile,profilepic
    }=useContext(mydata);
    const sessiontoken=Gettoken();
    const sessionid = Getid();
    const Navigate = useNavigate();
    const[searchinput,setsearch]=useState('')
    useEffect(() => {
        
        totalquand();
        totalwishquand();
        
      }, []);
     
    const Admin=()=>{
      Navigate("/adminlogin")
    }
    const user=()=>{
      Navigate("/login");
      
    }
   
    const totalwishquand = async (value_id) => {
        try {
          const response = await axios.get(`http://localhost:5000/users/wish/${sessionid}`, {value_id});
          Setcount(response.data.totalquantity);
          console.log("total", response.data.totalquantity)
        }
        catch (err) {
          console.log(err);
        }
      };
      const totalquand = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {})
          Setcount1(response.data.totalquantity);
          console.log("total", response.data.totalquantity);
         
        }
        catch (err) {
          console.log(err);
        }
      };
      const clickprofile=()=>{
        setuserProfile(false);
      }
      const bURL="http://localhost:5000/upload";
      console.log(profilepic,"fred")
    return(
        <div>
        <div className="seconddiv">
        <Link className="link2" ><div className="seconddivh3"><AiOutlineQuestionCircle/></div><p className="seconddivp">Help</p></Link>
        <Link className="link2" ><div className="seconddivh32"><GrLocation/></div><p className="seconddivp2">Track order</p></Link>
        <Link className="link2" ><p className="seconddivp3">Find a store</p></Link>
        <Link className="link2" ><p className="seconddivp4">Bulk Order</p></Link>
        <Link className="link2" ><p className="seconddivp5">UL service</p></Link>
        </div>
        <div fluid className="thirddiv">
        {/* <div className='wishcount1'>{Count1}</div>
         */}
      <Navbar collapseOnSelect expand="lg" className="bg-body-info">
      <Container>
        <Navbar.Brand>
          <Link className='headerL' to='/'>
            <div className="logo">
              <h2>DEFINED DESIGN</h2>
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className='navitem1'>
              <input 
                value={searchinput} 
                className='searchbar'
                onChange={(e) => setsearch(e.target.value)} 
                type="text"
              />
              <span className="searchbarbutton">
                <h3><FiSearch/></h3>
              </span>
            </Nav.Item>
            <Nav.Link className='navlink1'>
              {sessiontoken ?
                <div className='userP'onClick={()=>clickprofile()} >
                  
               {/* <img className='userPic'src={`${bURL}/${profilepic.users.profile[0]}`} alt="img" />   */}
                  
                </div> :
                <div  onClick={()=>user()}><FaRegUser/></div>
              }
            </Nav.Link>
            <Nav.Link className='navlink1'>
              <Link to='/wishlist' className="link2">
                <div><BsHeart/></div>
              </Link>
            </Nav.Link>
            <Nav.Item className='navitem2'><div>{Count}</div></Nav.Item>
            <Nav.Link className='navlink1'>
              <Link to='/addtocart' className="link2">
                <div><FiShoppingCart/></div>
              </Link>
            </Nav.Link>
            <Nav.Item className='navitem3'><div>{Count1}</div></Nav.Item>
            <Nav.Link className='navlink1'>
              <Link to='/adminlogin' className="link2">
                <div><MdOutlineAdminPanelSettings/></div>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        </div>
        </div>
        
    )
}