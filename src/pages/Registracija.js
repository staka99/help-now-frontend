import React from 'react';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import axios from "axios";
import {Formik, Form, Field} from 'formik'
import { useEffect, useState } from "react";
import * as Yup from "yup"; 
import StripeCheckout from "react-stripe-checkout";

/*const KEY = "pk_test_51L2gAnCQRdSSagWwMVq8yDqFc0XtCb6vY9emCcwftB2xzpaIYYLyJnAGTIhHdZhJKtbIjT0uQSSuIG5TqjHOEr3T00SH4Z5biF";
const STRIPE_KEY = "sk_test_51L2gAnCQRdSSagWwG8CdalJzaqXFYsJhv1XEk6uuFu5J3AzNPrM7JJXBbojRB8I3arErVrumwvxo8fbVu2fBsDnc00dDtWJqNl";
*/
function Registracija() {

    const [listOfClanarina, setListOfClanarina] = useState([]);
    const [listOfGrad, setListOfGrad] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3100/clanarina").then((response) => {
            setListOfClanarina(response.data);
        });
      }, []);

      useEffect(() => {
        axios.get("http://localhost:3100/grad").then((response) => {
            setListOfGrad(response.data);
        });
      }, []);

      const [clanarina] = React.useState({
        vrstaClanarine: "Redovna",
        iznos: 300
      });
  

    const initialValues = {
        ime: "",
        prezime: "",
        jmbg: "",
        datumRodjenja: "",
        pocetakVolontiranja: "",
        email: "",
        lozinka: "",
        adresa: "",
        gradID: 1,
        clanarinaID: 1,
        uloga: "Donator"
      };

      const validationSchema = Yup.object().shape({
       /* nazivVrste: Yup.string().max(45).required("Polje tip garderobe ne smije da bude prazno!"),
        ikonica: Yup.string().max(150)*/
      })

      async function handleToken(token, addresses)  {
        console.log(token, addresses);
        const response = await axios.post(
          "http://localhost:3100/checkout",
          { token, clanarina }
        );
        const { status } = response.data;
        console.log(clanarina);
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Uspješna registracija!", { type: "success" });
        } else {
          toast("Nešto je pošlo pošlo po zlu", { type: "error" });
        }
      }

      const onSubmit = (data) => {
        if(data.clanarinaID === 1) {
          clanarina.vrstaClanarine = "Redovna";
          clanarina.iznos = 300
        } else if(data.clanarinaID === 2){
          clanarina.vrstaClanarine = "Studentska";
          clanarina.iznos = 200
        } else if(data.clanarinaID === 3){
          clanarina.vrstaClanarine = "Penzionerska";
          clanarina.iznos = 200
        } else if(data.clanarinaID === 4){
          clanarina.vrstaClanarine = "Premium";
          clanarina.iznos = 500
        } else {
          clanarina.vrstaClanarine = "Premium plus";
          clanarina.iznos = 800
        }
  
        axios.post("http://localhost:3100/korisnik", (data)).then((response) => {
          console.log("Uspješno dodavanje!");
        });
      };

    return (
        <div className='registracija'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label> Ime: </label>
                    <Field autocomplete="off" id="inputCreatePost" name="ime" placeholder="Unesite ime" />
                    <label> Prezime: </label>
                    <Field autocomplete="off" id="inputCreatePost" name="prezime" placeholder="Unesite prezime" />
                    <label> JMBG: </label>
                    <Field autocomplete="off" id="inputCreatePost" name="jmbg" placeholder="Unesite JMBG" />
                    <label> Datum rođenja: </label>
                    <Field type="date" id="inputCreatePost"  name="datumRodjenja" />
                    <label> Početak volontiranja: </label>
                    <Field  type="date" id="inputCreatePost"  name="pocetakVolontiranja" />
                    <label> Email: </label>
                    <Field  type="email" id="inputCreatePost" name="email" placeholder="Unesite email" />
                    <label> Lozinka: </label>
                    <Field  type="password" id="inputCreatePost" name="lozinka" placeholder="Unesite lozinku" />
                    <label> Adresa: </label>
                    <Field  autocomplete="off" id="inputCreatePost" name="adresa" placeholder="Unesite adresu" />
                    <label> Grad: </label>
                    <Field as="select"  id="inputCreatePost" name="gradID" form="gradform">
                    {listOfGrad.map((value, key) => {
                    return (
                         <option value={value.gradID}>{value.nazivGrada}</option>
                         );
                     })}
                    </Field>
                    <label> Članarina: </label>
                    <Field as="select" id="inputCreatePost" name="clanarinaID" form="clanarinaform" onchange="clanarina(this)">
                    {listOfClanarina.map((value, key) => {
                    return (
                         <option value={value.clanarinaID}>{value.vrstaClanarine}, {value.iznos} RSD</option>
                         );
                     })}
                    </Field>
                    <StripeCheckout
                      stripeKey="pk_test_51L2gAnCQRdSSagWwMVq8yDqFc0XtCb6vY9emCcwftB2xzpaIYYLyJnAGTIhHdZhJKtbIjT0uQSSuIG5TqjHOEr3T00SH4Z5biF"
                      token={handleToken}
                      amount={clanarina.iznos*100}
                      image="https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.15752-9/283566207_691198118661564_6737257227334074640_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeH2EDr65peqaZhGkGja0DbrCX5zJf2h0IoJfnMl_aHQisafTNcthvYO7Snb94_zwiY&_nc_ohc=hYMvgOZPs2oAX86-lvU&_nc_ht=scontent.fbeg1-1.fna&oh=03_AVKShLc9oTrKuoe-ZKH0mWE-HSdWlT-w01MFPP6pngEfzg&oe=62B3BB70"
                      name="Help now"
                      billingAddress
                      shippingAddress
                    >
                    <button type="submit"> Registruj se </button>          
                    <ToastContainer />
                </StripeCheckout>
                </Form>
            </Formik>
        </div>
      )
  }
  
    

export default Registracija