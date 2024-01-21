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
import Loginpage from './Components/Loginpage';
import Login1 from './Components/Login1';
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




function App() {

  const [Sofadata, Setsofadata] = useState([])
  const [Footersub4, SetFootersub4] = useState(footersub4)
  const [Productdetail, Setproductdetail] = useState([])
  const [token, settoken] = useState("");
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
  const[Userlogin,setuselogin]=useState({});
  const [Cartid,setCartid]=useState([]);
  const [login, setlogin] = useState(true);
  const [Cartproducts, setCartproducts] = useState([]);


  useEffect(() => {
    fectdata();
    // fectuserdata();
  }, []);
  const fectdata = async () => {
    const responce = await axios.get('http://localhost:5000/product');
    Setsofadata(responce.data);
  }
  // const fectuserdata = async () => {
  //   const responce = await axios.get('http://localhost:5000/users');
  //   setUsers(responce.data);

  // }


  // useEffect(() => {
  //   fectuserdata();
  // }, []);


  const values = {
    Footersub4, SetFootersub4, Sofadata, Setsofadata, Productdetail, Setproductdetail,
    Addtokart, Setaddtokart, Count, Setcount, Count1, Setcount1, users, setUsers, islogedin, setIslogedin,
    price, setprice, admin, setadmin, recently, setrecently, recentsub, setrecentsub, homedata, sethomedata, login, setlogin
    , token, settoken,Userlogin,setuselogin,Cartid,setCartid,Cartproducts, setCartproducts
  }
  return (
    <div className="App">
      <BrowserRouter>
        <mydata.Provider value={values}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/footer' element={<Footer />} />
            <Route path='/sofas' element={<Sofas />} />
            <Route path='/bed' element={<Bed />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/productdetails/:id' element={<Chelsea />} />
            <Route path='/addtocart' element={<Cart />} />
            <Route path='/signup' element={<Loginpage />} />
            <Route path='/login' element={<Login1 />} />
            <Route path='/adminlogin' element={<Adminpanellogin />} />
            <Route path='/admin' element={<Adminlogin />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/Aaddproducts' element={<Adminaddproducts />} />
            <Route path='/Aproductsdetail' element={<Admiinproductdet />} />
            <Route path='/dining' element={<Dining />} />
            <Route path='/dealzone' element={<Dealzone />} />
            <Route path='/recentlyviewed' element={<Rviewd />} />


          </Routes>
        </mydata.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;