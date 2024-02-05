import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import mydata from './Components/Context';
import { footersub4, sofa } from './Components/Data';
import Sofas from './Components/Sofas';
import Footer from './Components/Footer';
import { useState } from 'react';
import Chelsea from './Components/Chelsea';
import Bed from './Components/Bed';
import Wishlist from './Components/wishlist';
import Cart from './Components/Cart';
import Adminpanellogin from './Components/Adminpanellogin';
import Payment from './Components/Payment';
import Adminlogin from './Components/Adminlogin';
import Adminaddproducts from './Components/Adminaddproducts';
import Admiinproductdet from './Components/Adminproductdet';
import Dining from './Components/Dining';
import Dealzone from './Components/Dealzone';
import Rviewd from './Components/Rviewd';
import axios from 'axios'
import { useEffect } from "react";
import Getid from './Components/session';
import Admintoken from './Components/admin';
import Head from './Components/Head';
import Loginandreg from './Components/Loginandreg';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';




function App() {

  const [Sofadata, Setsofadata] = useState([])
  const [Footersub4, SetFootersub4] = useState(footersub4)
  const [Productdetail, Setproductdetail] = useState([])
  const [token, settoken] = useState("");
  const [token1, settoken1] = useState("");
  const [Addtokart, Setaddtokart] = useState([])
  const [Count, Setcount] = useState(0)
  const [Count1, Setcount1] = useState(0)
  const [users, setUsers] = useState([])
  const [recently, setrecently] = useState([])
  const [recentsub, setrecentsub] = useState([])
  const [islogedin, setIslogedin] = useState(false);
  const [price, setprice] = useState('');
  const [homedata, sethomedata] = useState([])
  const [admin, setadmin] = useState({
    username: "admin",
    password: "admin123",
  });
  const [Userlogin, setuselogin] = useState({});
  const [Cartid, setCartid] = useState([]);
  const [login, setlogin] = useState(true);
  const [Cartproducts, setCartproducts] = useState([]);
  const [wishproducts, setwishproducts] = useState([]);
  const [wishliststatus, setwishliststatus] = useState([])
  const sessionid = Getid();
  const adminid = Admintoken();
  useEffect(() => {
    fectdata();
    totalquand();
    totalwishquand();
    fetchwishlist();
    fectuser();
  }, []);
  const fectuser= async()=>{
    const responce= await axios.get('http://localhost:5000/users');
    setUsers(responce.data);

  }
  const fectdata = async () => {
    const responce = await axios.get('http://localhost:5000/product');
    Setsofadata(responce.data);
  }
  const totalquand = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/savedcart/${sessionid}`, {})
      Setcount1(response.data.totalquantity);
      console.log("total", response.data.totalquantity);

    }
    catch (err) {
      console.log(err);
    }
  }
  const totalwishquand = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/wish/${sessionid}`, {})
      Setcount(response.data.totalquantity);
      console.log("total", response.data.totalquantity)
    }
    catch (err) {
      console.log(err);
    }
  }
  const fetchwishlist = async () => {
    try {


      const response = await axios.get(`http://localhost:5000/users/wish/${sessionid}`, {})
      setwishproducts(response.data.wishlist);
      console.log("onlyidincart", response.data.wishlist)
      console.log("total", response.data.totalquantity)
    }
    catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fectuserdata();
  // }, []);


  const values = {
    Footersub4, SetFootersub4, Sofadata, Setsofadata, Productdetail, Setproductdetail,
    Addtokart, Setaddtokart, Count, Setcount, Count1, Setcount1, users, setUsers, islogedin, setIslogedin,
    price, setprice, admin, setadmin, recently, setrecently, recentsub, setrecentsub, homedata, sethomedata, login, setlogin
    , token, settoken, Userlogin, setuselogin, Cartid, setCartid, Cartproducts, setCartproducts, wishproducts, setwishproducts
    , wishliststatus, setwishliststatus, token1, settoken1
  }
  return (
    <div className="App">
      <BrowserRouter>
        <mydata.Provider value={values}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Headd' element={<Head />} />
            <Route path='/footer' element={<Footer />} />
            <Route path='/sofas' element={<Sofas />} />
            <Route path='/bed' element={<Bed />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/productdetails/:id' element={<Chelsea />} />
            <Route path='/addtocart' element={<Cart />} />
            <Route path='/adminlogin' element={<Adminpanellogin />} />
            {adminid && <Route path='/admin' element={<Adminlogin />} />}
            <Route path='/payment' element={<Payment />} />
            <Route path='/Aaddproducts' element={<Adminaddproducts />} />
            <Route path='/Aproductsdetail' element={<Admiinproductdet />} />
            <Route path='/dining' element={<Dining />} />
            <Route path='/dealzone' element={<Dealzone />} />
            <Route path='/recentlyviewed' element={<Rviewd />} />
            <Route path='/login' element={<Loginandreg/>}/>  
          </Routes>
        </mydata.Provider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;