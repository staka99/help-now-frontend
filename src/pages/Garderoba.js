import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css'; 

function Garderoba() {
    const [listOfVrstaOdjece, setListOfVrstaOdjece] = useState([]);
    const [setKolicina] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3100/vrsta_odjece").then((response) => {
        setListOfVrstaOdjece(response.data);
      });
    }, []);

    const handleQuantity = (type, value) => {
      if (type === "dec" && value.kolicina > 1) {
        --value.kolicina;
        setKolicina(value.kolicina);
      } else if(type === "inc") {
        ++value.kolicina;
        setKolicina(value.kolicina);
      }
    }


    const handleAddToCart = (product) => {
      cart.push(product);
      console.log(cart);
      console.log(cart.length)
    }


  return (
    <div className="garderoba">
    {listOfVrstaOdjece.map((value, key) => {
        return (
          <div className="post" key={key}>
            <div className="title">{value.nazivVrste}</div>
            <div className="body"> <img alt="Slika" src={value.ikonica} width="150" height="150"></img> </div>
            <div className="footer">
                 <div className="title">Količina:</div>
                  <button className="btn" onClick={()=> handleQuantity("dec", value)}> - </button>
                  <div className="foot">{value.kolicina}</div>
                  <button className="btn" onClick={()=> handleQuantity("inc", value)}> + </button>
                  <button className="btnadd" onClick={()=> handleAddToCart(value)}>DODAJ</button>
            </div>
          </div>
        );
      })}
   </div>
  )
}

export default Garderoba()