import { Link } from "react-router-dom";
 import  "./Style/Home.css"
 import Carousel from 'react-bootstrap/Carousel';
import Header from "./Header";
import {BiSolidOffer} from "react-icons/bi"
import {LiaStoreAltSolid} from "react-icons/lia"
import {LuSofa} from "react-icons/lu"
import {BiBed} from "react-icons/bi"
import {MdOutlineBreakfastDining} from "react-icons/md"
import {GiHanger} from "react-icons/gi"
import {LuArmchair} from "react-icons/lu"
import {MdChairAlt} from "react-icons/md"
import {GiTable} from "react-icons/gi"
import {GiConverseShoe} from "react-icons/gi"
import {GiBookshelf} from "react-icons/gi"
import {GiStreetLight} from "react-icons/gi"
import {BsFillBookmarkStarFill} from "react-icons/bs"
import Footer from "./Footer";
import Sofas from "./Sofas";
import { VscArrowRight } from "react-icons/vsc";
import { useContext } from "react";
import { useState } from "react";
import mydata from "./Context";
import axios from "axios";
import { useEffect } from "react";
import Getid from "./session";
import Gettoken from "./sessiontoken";
import Container from 'react-bootstrap/Container';
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";




 function Home(){
  const{recentsub,homedata,sethomedata,setrecentsub,
    Setcount,Setcount1,
    setuselogin, userprofile ,profile,setProfile,setuserProfile,profilepic,setprofilepic}=useContext(mydata);
    const [selectedFile, setSelectedFile] = useState(null);
    const [addsign,Setaddsign]=useState(true);
    const[indexprofile,setindexprofile]=useState([]);
  console.log(homedata)
  const userid=Getid();
  const usertoken=Gettoken();
  const Navigate = useNavigate();
  useEffect(()=>{
    fectdata();
    fetchrecent();
    fectuser();
  },[]);
  const logout=()=>{
    sessionStorage.clear("usertoken")
    sessionStorage.clear("userid")
    Navigate('/');
    setuselogin([]);
    Setcount(0);
    Setcount1(0);
    closeprofile();

  };
  const fectdata = async ()=>{
    const responce = await axios.get('http://localhost:5000/homeimage');
    sethomedata(responce.data);
   
  };
  const closeprofile=()=>{
    setuserProfile(true);
  }
  const fectuser= async()=>{
    if (!usertoken) {
      console.log("user not authenticated");
      // nav("/login")
    }
    try{
        const responce= await axios.get(`http://localhost:5000/users/singleusers/${userid}`);
        const profiledata=responce.data;
        setindexprofile(profiledata.users.profile);
        setprofilepic(profiledata)
    
  }catch(err){
    console.log(err);
  }
    }

  const fetchrecent = async()=>{
        try {
            if(!usertoken){
              console.log("user not authenticated");
              setrecentsub([]);
            }
            else{
    const response = await axios.get(`http://localhost:5000/users/recent/${userid}`);
    const datas =response.data;
    setrecentsub(datas.recentlyv);
    console.log("onlyidincart",recentsub);
            }
        }
catch(err){
console.log(err);
}
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      await axios.post(`http://localhost:5000/users/upload/${userid}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          
        },
      });

      console.log('Image uploaded successfully!');
      fectuser();
      setSelectedFile(null)
    } catch (error) {
      console.error('Image upload failed!', error);
    }
   
  };
  const addprofile=()=>{
    Setaddsign(false);
  }
  const closeupload=()=>{
    Setaddsign(true);
  }
  const deleteprofile=async(filename)=>{
    try{
      if (!usertoken) {
        console.log("user not authenticated");
        // nav("/login")
      }
      else{
      const responce= await axios.post(`http://localhost:5000/users/upload/del/${userid}`,{filename});
       console.log(responce);
       fectuser();
      }
    }catch(err){
      alert("erro occurs")
        console.log(err);
    }

  }
  console.log("hey",indexprofile);
  console.log("pro",profilepic)
  const bURL="http://localhost:5000/upload"
   
    return(
        <div className="maindiv">
           { userprofile ==false && <div className="profile">
              <div className="closebutton"><h6 onClick={()=>closeprofile()}>close<AiOutlineClose/></h6></div>  
                   {indexprofile.includes(profilepic.users.profile[0])?<div className="profilephoto">
                      <img className="profilepic"src={`${bURL}/${profilepic.users.profile}`} alt="img" />
                    </div>: <div className="profilephoto" ></div>}
                  {indexprofile.includes(profilepic.users.profile[0])? 
                  <div onClick={()=>deleteprofile(profilepic.users.profile)} className="addprofilesign"><MdOutlineDeleteForever /></div>
                  :<div onClick={()=>addprofile()} className="addprofilesign"> < FaCirclePlus /></div>  }                  

                    {addsign==false&& <div className="uploadarea">
                      <div onClick={()=>closeupload()} className="closeupload"><AiOutlineClose/></div>
                    <input className="upload" onChange={handleFileChange} type="file" />
                    <button onClick={handleUpload} className="uploadbutton">upload</button>
                    </div>}
                   
                     {profilepic && 
                    <>
                    <h1>{profilepic.users.username}</h1>
                    <h5>{profilepic.users.email}</h5>
                    </>
                } 
              <button className="logout" onClick={()=>logout()}>Logout</button>
                </div>}
          <div className={`${ userprofile==false?"maindivS":"maindivsub"}`}>

            <div className="firstdiv">
       <p>&nbsp;Full House Sale&nbsp;|&nbsp;Up to 70% off +Extra 10%off&nbsp;|&nbsp;<Link className="link">Click  to Shop!</Link></p>
           </div>

           <Header/>

        <div className="fourthdiv">
            {homedata.map((data)=>(

           
        <Carousel>
        <Carousel.Item >
      <img className="courouselimg" src={data.url[0]} alt="img" />
      </Carousel.Item>
      <Carousel.Item >
      <img className="courouselimg" src={data.url[1]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
      <img  className="courouselimg" src={data.url[2]} alt="img" />
      </Carousel.Item>
      <Carousel.Item>
       <img  className="courouselimg" src={data.url[3]} alt="img" />
      </Carousel.Item>
    </Carousel>
     ))}
        </div>
        <Container fluid> 
        <div className="sixthdiv">
                <h3 className="rh3">Recently Viewed</h3>
                <p className="rifp">_______________</p>
                <Link className="Hlink" to={'/recentlyviewed'}><div className="vround"><VscArrowRight/></div></Link>                
               
        <div className="vhomediv">   
              
              {recentsub.map((data)=>(
                <div  className="vhomesub">               
               <img className="vhomeimg" src={data.image} alt="img" /> 
               <div className="vhomemini">
               <h6>{data.name}</h6>
               <p>{data.description}</p>
               <p>₹{data.price}</p>
               </div>
              
                </div>
            ))}
              
        
        </div>      
       
        </div>
       </Container>
           
    <div className="fifthdiv">
     
        <h3 className="fifthsub">Explore Our Furniture Range</h3>
            <p className="fifp">______________________</p>
        

       <nav className="fifthmain">
                <ul className="fifthmain">
        <li className="main1">
        <Link className="Hlink" to={"dealzone"}><h3><BiSolidOffer/></h3>
            <p>All Products</p></Link>
        </li>
              
              
      
        <li className="main3">
        <Link className="Hlink" to={"sofas"}><h3><LuSofa/></h3>
            <p>Sofas</p></Link>
        </li>
       
      
        <li className="main4">
        <Link className="Hlink" to={"bed"}><h3><BiBed/></h3>
            <p>Beds</p></Link>
         </li>
        
       
         <li className="main5">
         <Link className="Hlink" to={"/dining"}><h3><MdOutlineBreakfastDining/></h3>
            <p>Dining</p></Link>
         
        </li>
       
        <li className="main6">
        <Link className="Hlink" to={""}><h3><GiHanger/></h3>
            <p>wardrobe</p></Link>
        </li>
        
        
        <li className="main7">
        <Link className="Hlink" to={""}><h3><LuArmchair/></h3>
            <p>Recliner</p></Link>
        </li>

        <li className="main8">
        <Link className="Hlink" to={""}><h3><MdChairAlt/></h3>
            <p>Seat</p></Link>
        </li>

       <li className="main9">
       <Link className="Hlink" to={""}><h3><GiTable/></h3>
            <p>Table</p></Link>
        </li>

        <li className="main10">
        <Link className="Hlink" to={""}><h3><GiConverseShoe/></h3>
            <p>Shoerack</p></Link>
        </li>

        <li className="main11">
        <Link className="Hlink" to={""}><h3><GiBookshelf/></h3>
            <p>BookShelf</p></Link>
        </li>
        </ul>
    </nav>  
    </div>  


       <div className="sevendiv">
        <Footer/>
       </div>
       </div>
        </div>

    )
}
export default Home;