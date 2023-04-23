import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";

function Login() {
  const [ime] = useState("");
  const [prezime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [uloga] = useState("");

  const[loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

    const login = () => {
      axios.post("http://localhost:3100/login", {
        ime: ime,
        prezime: prezime,
        email: email,
        lozinka: lozinka,
      }).then((response) => {
        if(response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          window.location.reload(false);
          setLoginStatus(response.data[0].ime + ' ' + response.data[0].prezime);
        }
      });
    };

    useEffect(()=>{
      axios.get("http://localhost:3100/login").then((response) => {
        if(response.data.loggedIn === true){  
          setLoginStatus(response.data.user[0].ime + ' ' + response.data.user[0].prezime);
        }
      })
    }, [])

  return (
    <div className='login' >
      <div className='formContainer'>
                  <label> Email: </label>
                  <input id="inputCreatePost" type="email" placeholder='Unesite email' onChange={(e)=> {
                    setEmail(e.target.value);
                  }}/>
                  <label> Lozinka: </label>
                  <input id="inputCreatePost" type="password" placeholder='Unesite lozinku' onChange={(e)=> {
                    setLozinka(e.target.value);
                  }}/>                    
                  <button onClick={login}> Login </button>
      </div>
    </div>
    )
  }
  

export default Login


