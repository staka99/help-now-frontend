import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from "yup"; 
import axios from "axios";

function DodavanjeGarderobe() {
  
    const initialValues = {
        nazivVrste: "",
        ikonica: "",
      };

      const validationSchema = Yup.object().shape({
        nazivVrste: Yup.string().max(45).required("Polje tip garderobe ne smije da bude prazno!"),
        ikonica: Yup.string().max(150)
      })

      const onSubmit = (data) => {
        axios.post("http://localhost:3100/vrsta_odjece", (data)).then((response) => {
          console.log("Uspješno dodavanje!");
        });
      };

  return (
    <div className='dodavanjeGarderobe'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label> Tip garderobe: </label>
                <ErrorMessage name="nazivVrste" component="span" />
                <Field autocomplete="off" id="inputCreatePost" name="nazivVrste" placeholder="Unesite naziv tipa" />
                <label> Slika: </label>
                <ErrorMessage name="ikonica" component="span" />
                <Field autocomplete="off" id="inputCreatePost" name="ikonica" placeholder="Unesite link" />
                <button type="submit"> Dodaj </button>
            </Form>
        </Formik>
    </div>
  )
}

export default DodavanjeGarderobe