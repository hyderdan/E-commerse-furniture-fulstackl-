
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
import{MdOutlineAdminPanelSettings} from "react-icons/md";
// import Gettoken from "./sessiontoken";
// import axios from 'axios';
// import Getid from "./session";
import { useEffect } from 'react'

export default function Head(){
    const{Count,Count1,islogedin, Setproductdetail, Setaddtokart,setIslogedin,Setcount,Setcount1,login,
        token, settoken
    }=useContext(mydata);
    // const sessiontoken=Gettoken();
    // const sessionid = Getid();
    // const Nav = useNavigate();
    const[searchinput,setsearch]=useState('')
    useEffect(() => {
        
        // totalquand();
        // totalwishquand();
        
      }, []);
    const Admin=()=>{
        Nav("/adminlogin")
    }
    const user=()=>{
        Nav("/loginr")
    }
    // const totalwishquand = async (value_id) => {
    //     try {
    //       const response = await axios.get(`http://localhost:5000/users/wish/${sessionid}`, {value_id});
    //       Setcount(response.data.totalquantity);
    //       console.log("total", response.data.totalquantity)
    //     }
    //     catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   const totalquand = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {})
    //       Setcount1(response.data.totalquantity);
    //       console.log("total", response.data.totalquantity);
         
    //     }
    //     catch (err) {
    //       console.log(err);
    //     }
    //   };
    return(
        <div>
            <div className="seconddiv">
        <Link className="link2" ><div className="seconddivh3"><AiOutlineQuestionCircle/></div><p className="seconddivp">Help</p></Link>
        <Link className="link2" ><div className="seconddivh32"><GrLocation/></div><p className="seconddivp2">Track order</p></Link>
        <Link className="link2" ><p className="seconddivp3">Find a store</p></Link>
        <Link className="link2" ><p className="seconddivp4">Bulk Order</p></Link>
        <Link className="link2" ><p className="seconddivp5">UL service</p></Link>
        </div>

              <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
    )
}