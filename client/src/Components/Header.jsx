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




export default function Header(){
    const{Count,Count1,islogedin, Setproductdetail, Setaddtokart,setIslogedin,Setcount,Setcount1,login,
        token, settoken
    }=useContext(mydata);
    const sessiontoken=Gettoken();
    const Nav = useNavigate();
    const[searchinput,setsearch]=useState('')
    function clearAll(){
        if(islogedin===true){
            Setproductdetail([]);
            Setaddtokart([]);
            Setcount(0);
            Setcount1(0);
            setIslogedin(false)
            Nav('')

        }
        else{
            Nav("/login")
        }      
      
    }
    function handlesearch(){
        if(searchinput.toUpperCase().includes("SOFA")){
            return "/sofas"
        }
        else if(searchinput.toUpperCase().includes("BED")){
            return "/bed"
        }
       }

    const Admin=()=>{
        Nav("/adminlogin")
    }
    return(
        <div>
        <div className="seconddiv">
        <Link className="link2" ><div className="seconddivh3"><AiOutlineQuestionCircle/></div><p className="seconddivp">Help</p></Link>
        <Link className="link2" ><div className="seconddivh32"><GrLocation/></div><p className="seconddivp2">Track order</p></Link>
        <Link className="link2" ><p className="seconddivp3">Find a store</p></Link>
        <Link className="link2" ><p className="seconddivp4">Bulk Order</p></Link>
        <Link className="link2" ><p className="seconddivp5">UL service</p></Link>
        </div>
        <div className="thirddiv">
     <Link className='headerL'to={'/'}><div className="logo"> <h1>DEFINED DESIGN</h1></div></Link>
     <Container fluid>
 <input className="searchbar" value={searchinput} onChange={(e)=>setsearch(e.target.value)} type="text"/>
 <span onClick={()=>handlesearch()} className="searchbarbutton"> <h3><FiSearch/></h3></span>
    </Container>
  
         
    <div className="thirddivh3" onClick={()=>clearAll()}>
        {sessiontoken?<IoMdLogOut/>:<FaRegUser/>}
        </div>
     <Link to={'/wishlist'} className="link2" ><div className="thirddivh4"><BsHeart/></div></Link>
     <Link to={'/addtocart'} className="link2" ><div className="thirddivh5"><FiShoppingCart/></div></Link>
     <Link to={'/adminlogin'} className="link2" ><div className="thirddivh6" ><MdOutlineAdminPanelSettings/></div></Link>
   
        </div>
        <div className='wishcount'>{Count}</div>
        <div className='wishcount1'>{Count1}</div>
       
        </div>
        
    )
}