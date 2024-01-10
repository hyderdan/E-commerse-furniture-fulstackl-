import "./Style/Footer.css"
import{FiPhoneCall }from "react-icons/fi"
import{AiOutlineMail}from "react-icons/ai"
import{FaFacebookF}from "react-icons/fa"
import{BsInstagram}from "react-icons/bs"
import{BiLogoPinterest}from "react-icons/bi"
import{BsYoutube}from "react-icons/bs"
import{AiFillLinkedin}from "react-icons/ai"
import { useContext } from "react"
import mydata from "./Context"
export default function Footer(){
   const {Footersub4}=useContext(mydata)
    return(
        <div className="footermain">
            <div className="footersub1">
            <p>SIGN UP AND GET A CHANCE TO WIN THE GIVEAWAY OF THE WEEK.</p>
            <input className="footersub1text" type="text"  placeholder="Your Email ID"/>
            <button className="footersub1button">Suscribe</button>
            </div>

            <div className="footersub2">       
        <div className="footersubp">
        <ul>
            <li> <h6>The company :</h6></li>
            <li>About us</li>
            <li>Help</li>
            <li>Blog</li>
           <li> Inside UL</li>
           <li>Career</li>
            <li>Privacy Policy</li>         
           </ul>          
        </div>

        <div className="footersubp2">      
        <ul>
            <li> <h6>More Information :</h6></li>
            <li>Fees & Payment</li>
            <li>Shipping & Delivery</li>
            <li>Teerm & Condition</li>
           <li> Warranty,Return <br />
           & Rfund
           </li>      
           </ul>
        </div>

        <div className="footersubp3">      
        <ul>
            <li> Contact Us</li>
            <li>Visit Us</li>    
           </ul>
        </div>

        <div className="footersubp4">      
        <ul>
            <li><h6>Explore More :</h6></li>
            <li>Refer & Earn</li>
            <li>Gift Card</li>    
           </ul>
        </div>
            

            <div className="footersubp5">      
        <h6>Address :</h6>
        <p>Reliance Retail Limited,<br />
                  3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao,<br />
                   Mumbai- 400 002, Maharashtra, India <br /><br />
        CIN: U01100MH1999PLC120563</p>
        </div>          
        </div> 

        <div className="footersub3">
            <h5>Connect with us :</h5>
        </div>
        <div className="footersub3li">
        <ul>
          <li><FiPhoneCall/></li>  
          <li><AiOutlineMail/></li>  
          <li><FaFacebookF/></li>  
          <li><FiPhoneCall/></li>  
          <li><BiLogoPinterest/></li>  
          <li><BsYoutube/></li>  
          <li><BsInstagram/></li>  
          <li><AiFillLinkedin/></li>         
        </ul>
        </div>

        <div className="footersub4">
        <h5>We Accept :</h5>
        <div className="footersubmap">
        {Footersub4.map((data)=>(
            <>
            <img src={data.image} alt="img" />
            </>
        ))}
        </div>
        </div>
        </div>
    )
}