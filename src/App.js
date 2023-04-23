
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import Garderoba from './pages/Garderoba';
import Korisnici from './pages/Korisnici';
import Login from './pages/Login';
import Registracija from './pages/Registracija';
import DodavanjeGarderobe from './pages/DodavanjeGarderobe';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {   
const [uloga, setUloga] = useState("");
const[korisnik, setKorisnik] = useState("");
const [cart, setCart] = useState([]);
const [authState, setAuthState] = useState({
  "loggedIn": false,
  "user": [  ]
});

axios.defaults.withCredentials = true;
useEffect(()=>{
  axios.get("http://localhost:3100/login").then((response) => {
    if (response.data.loggedIn === true) {
      setUloga(response.data.user[0].uloga); 
      setKorisnik(response.data.user[0].ime + ' ' + response.data.user[0].prezime);
    }
  });
}, []);

const logout = () => {
  console.log("Logout");
  setAuthState({ loggedIn: "false", user: "" });
  setUloga(false);
  
  console.log(authState);
  axios.defaults.withCredentials = false;
};
return (
<div className="App">
<Router>
  <div className="navbar">
    <img alt="Logo" src="https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.15752-9/280749795_357479029695812_2987377930348516338_n.png?_nc_cat=104&ccb=1-6&_nc_sid=ae9488&_nc_eui2=AeG4fTyGQWrygvtk8jwSOYPE19uHgQVmiovX24eBBWaKi8CrFsGHsgBR-ac8nRI9I4w&_nc_ohc=Q93jXR2cTPUAX-cLWEX&tn=eRJTlqf-sCXsErtX&_nc_ht=scontent.fbeg1-1.fna&oh=03_AVKHPaMgRjKDpqgM361aye9QvD3ADcKpaICMtwFlvqQDpQ&oe=62AB8068" width="160" height="90"></img>
    <Link to="/pocetna"> Početna</Link> 
    <Link to="/garderoba"> Garderoba </Link>
    {uloga === "Administrator" && <Link to="/korisnici"> Korisnici </Link>}
    {uloga === "Administrator" && <Link to="/dodavanje_garderobe"> Dodajte garderobu </Link>}
    {!uloga && (<> <Link to="/login"> Prijavite se </Link>, <Link to="/registracija"> Registracija </Link> </>)}
    {uloga && (<><div className="loggedInContainer">
        <h1> {korisnik} </h1> </div>
        <div className="loggedInContainer">
        <button onClick={logout}> Odjavite se</button> 
        <Link to="/korpa"> 🛒 </Link>
    </div> </>) }
    {!uloga && (<><div className="loggedInContainer">      
     <div className="cart">
      <span>
        <Link to="/korpa"> 🛒 </Link>
      </span>
      <span>{5}</span>
    </div>
    </div> </>) }
    </div>
  <Routes >
    <Route path='/'  element={<Home/>} />
    <Route path='/pocetna'  element={<Home/>} />
    <Route path='/garderoba' element={<Garderoba/>} />
    {uloga === "Administrator" && <Route path='/dodavanje_garderobe' element={<DodavanjeGarderobe/>} />}
    {!uloga && (<><Route path='/login' element={<Login/>} />, <Route path='/registracija' element={<Registracija/>}/> </>)}
    <Route path='/korisnici' element={<Korisnici/>} />
    <Route path='/korpa'  element={<Home/>} />
  </Routes >
</Router>
</div>
);
};

export default App;
