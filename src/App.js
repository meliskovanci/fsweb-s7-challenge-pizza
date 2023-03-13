import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Route, Switch } from "react-router-dom";
import Form from "./Components/Form";
import Home from "./Components/Home";
import Order from"./Components/Order";

const initialValues = {
      name: "",
      size: "",
      dough:"",
      pepperoni: false,
      sosis: false,
      Jambon: false,
      tavuk: false,
      soğan: false,
      domates: false,
      mısır: false,
      sucuk: false,
      jalepeno: false,
      sarımsak: false,
      biber: false,
      ananas: false,
      kabak: false,
      salam: false,
      instructions: "",
      adet: 1,
      ücret:85.50
}

const initialErrors = {
  name: "",
  size: "",
  dough: "",
  pepperoni: "",
  sosis: "",
  Jambon: "",
  tavuk: "",
  soğan: "",
  domates: "",
  mısır: "",
  sucuk: "",
  jalepeno: "",
  sarımsak: "",
  biber: "",
  ananas: "",
  kabak: "",
  salam: "",
  instructions: "",
  adet: "",
  ücret: "",
}



const App = () => {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [disabled, setDisabled] = useState(true);

      const validate = (name, value) => {
       
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => {
            setErrors({
              ...errors,
              [name]: "",
            });
          })
          .catch((err) => {
            setErrors({
              ...errors,
              [name]: err.errors[0],
            });
          });
        }

    
      useEffect(() => {
        schema.isValid(form).then((valid) => setDisabled(!valid));
      }, [form]);


      const schema = yup.object().shape({
        name: yup
          .string()
          .required()
          .min(2, "isim en az 2 karakter olmalıdır"),
        size: yup
          .mixed()
          .oneOf(["Küçük", "Orta", "Büyük"], "Bir tanesini seçmelisiniz.")
          .required(),
        dough: yup
          .mixed()
          .oneOf(
            ["ince", "orta", "kalın"],
            "Bir tanesini seçmelisiniz."
          )
          .required(),
        pepperoni: yup.boolean().oneOf([true, false], ""),
        sosis: yup.boolean().oneOf([true, false], ""),
        Jambon: yup.boolean().oneOf([true, false], ""),
        tavuk: yup.boolean().oneOf([true, false], ""),
        soğan: yup.boolean().oneOf([true, false], ""),
        domates: yup.boolean().oneOf([true, false], ""),
        mısır: yup.boolean().oneOf([true, false], ""),
        sucuk: yup.boolean().oneOf([true, false], ""),
        jalepeno: yup.boolean().oneOf([true, false], ""),
        sarımsak: yup.boolean().oneOf([true, false], ""),
        biber: yup.boolean().oneOf([true, false], ""),
        ananas: yup.boolean().oneOf([true, false], ""),
        kabak: yup.boolean().oneOf([true, false], ""),
        salam: yup.boolean().oneOf([true, false], ""),
        instructions: yup.string(),

        adet: yup
        .number()
        .required()
        .min(1, "Bir adetten fazla seçebilirsiniz"),

        ücret: yup
        .number()
        .required()
        .min(85.50, "Ek seçeneklerle fiyat artacaktır."),
      });

  

return (
  <div className="container">
 
    <Switch>
      <Route path={"/pizza"}>
        <Form form={form} setForm={setForm} validate={validate}  errors={errors} disabled={disabled} />
       
        
      </Route>
      <Route path="/order">
        <Order />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
);
};

export default App;
