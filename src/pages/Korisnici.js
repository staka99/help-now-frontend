import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Korisnici() {
    const [listOfKorisnici, setListOfKorisnici] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3100/korisnik").then((response) => {
        setListOfKorisnici(response.data);
      });
    }, []);


  return (
    <table>
    <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Adresa</th>
            <th>Grad</th>
            <th>Uloga</th>
          </tr>
      </thead>
      <tbody>
    {listOfKorisnici.map((value, key) => {
        return (
          <tr>
            <th>{value.korisnikID}</th>
            <th>{value.korisnikID}</th>
            <td>{value.ime}</td>
            <td>{value.prezime}</td>
            <td>{value.adresa}</td>
            <td>{value.nazivGrada}</td>
            <td>{value.uloga}</td>
          </tr>
        );
      })}
</tbody>
</table>
  )
}

export default Korisnici