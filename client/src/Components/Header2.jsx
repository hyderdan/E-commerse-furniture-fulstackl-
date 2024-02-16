import "./Style/Head2.css";
import "./Style/Header2.css"
import { FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {AiOutlineQuestionCircle} from 'react-icons/ai'
 import{GrLocation} from "react-icons/gr"
 import{FiSearch} from "react-icons/fi"
 import{FaRegUser} from "react-icons/fa"
 import{BsHeart} from "react-icons/bs"
 import{FiShoppingCart} from "react-icons/fi"
 import { Link } from "react-router-dom";
 import { IoMdContacts } from "react-icons/io";
import { useContext } from 'react'
import mydata from './Context'
import { useNavigate } from 'react-router-dom';
import{BiSolidUpArrow}from "react-icons/bi"
import { IoMdLogOut } from "react-icons/io";
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import Gettoken from "./sessiontoken";
import axios from 'axios';
import Getid from "./session";
import Profilepic from "./profilepic";
import { useEffect } from 'react';


const Header2 = () => {
    const { Count, Count1, Setcount, Setcount1, setuserProfile, profilepic } = useContext(mydata);
    const sessiontoken = Gettoken();
    const sessionid = Getid();
    const profile =Profilepic();
    const Navigate = useNavigate();
    const [opensearch, setopensearch] = useState(false);
    const [opennav, setopennav] = useState(false);

    useEffect(() => {
        totalquand();
        totalwishquand();
    }, []);

    const togglesearch = () => {
        setopensearch(!opensearch);
        setopennav(false);
    }

    const togglenav = () => {
        setopensearch(false);
        setopennav(!opennav); // Corrected to toggle opennav
    };

    const closenav = () => {
        setopennav(false);
    }

    const user = () => {
        Navigate("/login");
    }

    const totalwishquand = async (value_id) => {
        try {
            const response = await axios.get(`http://localhost:5000/users/wish/${sessionid}`, { value_id });
            Setcount(response.data.totalquantity);
            console.log("total", response.data.totalquantity)
        } catch (err) {
            console.log(err);
        }
    };

    const totalquand = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {});
            Setcount1(response.data.totalquantity);
            console.log("total", response.data.totalquantity);

        } catch (err) {
            console.log(err);
        }
    };

    const clickprofile = () => {
        setuserProfile(false);
    }
    const bURL="http://localhost:5000/upload"
   
    return (
        <div>
            <div className="seconddiv">
                <Link className="link2"><div className="seconddivh3"><AiOutlineQuestionCircle /></div><p className="seconddivp">Help</p></Link>
                <Link className="link2"><div className="seconddivh32"><GrLocation /></div><p className="seconddivp2">Track order</p></Link>
                {/* <Link className="link2"><p className="seconddivp3">Find a store</p></Link>
                <Link className="link2"><p className="seconddivp4">Bulk Order</p></Link>
                <Link className="link2"><p className="seconddivp5">UL service</p></Link> */}
            </div>
            <nav className={`nav ${opennav ? 'openNav' : ''}`}>
                <i className="uil uil-bars navOpenBtn" onClick={togglenav}><FaBars /></i>
                <a  className="logo"><Link to='/' className="link">DEFINED DESIGN</Link></a>

                <ul className="nav-links">
                    <i className="uil uil-times navCloseBtn" onClick={closenav}><IoClose /></i>
                    <li>
                        {sessiontoken ? (
                            <div className='userP' onClick={clickprofile}>
                            {profile ?<img className='userPic'src={`${bURL}/${profile}`} alt="img" />: <div></div>}
                            </div>
                        ) : (
                            <div onClick={user}><FaRegUser /></div>
                        )}
                    </li>
                    <li></li>
                    <li><Link to='/wishlist' className="link2"><div><BsHeart /></div></Link></li>
                    <li><div className="navitem2">{Count}</div></li>
                    <li><Link to='/addtocart' className="link2"><div><FiShoppingCart /></div></Link></li>
                    <li><div className="navitem2">{Count1}</div></li>
                    <li><Link to='/addtocart' className="link2"><div><IoMdContacts /></div></Link></li>
                </ul>
                <i className={`uil ${opensearch ? 'uil-times' : 'uil-search'} search-icon`} id="searchIcon" onClick={togglesearch}>
                <FaSearch />
            </i>

            {/* Search box */}
            {opensearch && (
                <div className="search-box">
                    <input type="text" placeholder="Search here..." />
                </div>
            )}

                
               
            </nav>
        </div>
    )
}

export default Header2;