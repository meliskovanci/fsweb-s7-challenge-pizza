import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Form.css";
import * as yup from "yup";
import {
  FormGroup, CardTitle, Card, CardText,
  ButtonToolbar, ButtonGroup, Button, Input, Label, Col, FormFeedback
} from "reactstrap"

const initialValues = {
  name: "",
  boyut: "",
  hamur: "",
  secenekler: [],
  instructions: "",
  adet: 1,
  ücret: 85.50,
  ekücret: ""
}

const initialErrors = {
  name: "",
  boyut: "",
  hamur: "",
  secenekler: [],
  instructions: "",
}

const secenekler = [
  "pepperoni",
  "sosis",
  "Jambon",
  "Tavuk",
  "soğan",
  "domates",
  "mısır",
  "sucuk",
  "jalepeno",
  "sarımsak",
  "biber",
  "kabak",
  "salam",
];

const Form = () => {

  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(true);
  const [submit, setSubmit] = useState(false)

  const [price, setPrice] = useState(data.ücret);
  const [counter, setCounter] = useState(1);
  const [malzemeSayısı, setMalzemeSayısı] = useState(0);
  const perCost = 5;
  const ekücret = perCost * malzemeSayısı
  const totalPrice = price * counter


  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  }

  const kontrol = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
    if (e.target.checked === true) {
      setMalzemeSayısı(malzemeSayısı + 1);
      setPrice(price + perCost);
    } else {
      setMalzemeSayısı(malzemeSayısı - 1);
      setPrice(price - perCost);
    }
  }

  const arttır = (e) => {
    setCounter(counter + 1)
  }

  const azalt = (e) => {
    if (counter >= 1)
      setCounter(counter - 1)
    if (counter <= 1)
      setCounter(1)
  }


  const schema = yup.object().shape({
    name: yup
      .string()
      .required("bu alanı doldurmak zorunludur.")
      .min(2, "isim en az 2 karakter olmalıdır"),
    boyut: yup
      .mixed()
      .oneOf(["Küçük", "Orta", "Büyük"], "Bir tanesini seçmelisiniz.")
      .required("Seçim yapınız"),
    hamur: yup
      .mixed()
      .oneOf(
        ["ince", "orta", "kalın"],
        "Bir tanesini seçmelisiniz."
      ),
    secenekler: yup
      .array()
      .max(10, "En fazla 10 tane seçebilirsiniz.")
      .default(0),


    instructions: yup
      .string()
      .required("bu alanı doldurmak zorunludur.")
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });

  };

  useEffect(() => {
    schema.isValid(data).then((valid) => setDisabled(!valid));
  }, [data]);

  useEffect(() => {
    console.log("hi", data)
  }, [data]);

  useEffect(() => {
    setData({ ...data, count: counter });
  }, [counter]);


  useEffect(() => {
    setData({
      ...data,
      price: price,
      ekücret: malzemeSayısı * perCost
    });
  }, [totalPrice]);


  useEffect(() => {
    console.log("errors >", errors);
  }, [errors]);


  return (
    <form id="pizza-form" className="form-container" onSubmit={onSubmit}>
      <div className="navbar">
        <h1 className="order-title">Pizza Siparişi</h1>
        <div className="direction">
          <NavLink className="links" to="/">
            Anasayfa
          </NavLink>

          <NavLink className="secenekler" to="/pizza">
            Seçenekler
          </NavLink>

          <NavLink id="order-pizza" className="links" to="/pizza">
            Sipariş oluştur
          </NavLink>
        </div>
      </div>

      <div className="icerik-container">
        <div className="pizza-info">
        <h2> Position Absolute Pizza </h2>
         

        </div>


        <FormGroup>
          <Label htmlFor="name-input">
          <h3>İsim: </h3>
          </Label>
          <Input
            id="name-input"
            name="name"
            placeholder="isim yazınız"
            type="text"
            onChange={changeHandler}
            value={data.name}
            invalid={errors.name}
            data-cy="name-input"

          />
          <FormFeedback>{errors.name}</FormFeedback>

        </FormGroup>

        <div className="seçimler">
          <div className="seçim-1">

            <Label
              htmlFor="size-dropdown"
              sm={2}
            >
              <h3>Boy:</h3>
            </Label>

            <FormGroup check htmlFor="size-dropdown" >
              <Label check>
                <Input type="radio" name="boyut" id="size-dropdown" value="Küçük" data-cy="size-dropdown" invalid={errors.boyut} onChange={changeHandler} /> Küçük
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check htmlFor="size-dropdown">
                <Input type="radio" name="boyut" id="size-dropdown" value="Orta" data-cy="size-dropdown" invalid={errors.boyut} onChange={changeHandler} /> Orta
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check htmlFor="size-dropdown">
                <Input type="radio" name="boyut" id="size-dropdown" value="Büyük" data-cy="size-dropdown" invalid={errors.boyut} onChange={changeHandler} /> Büyük
              </Label>
              <FormFeedback>{errors.boyut}</FormFeedback>

            </FormGroup>
          </div>


          <FormGroup >
            <Label
              htmlFor="dough-dropdown"
              sm={2}
            >
              <h3>Hamur: </h3>
            </Label>
            <Col sm={20}>
              <Input
                id="dough-dropdown"
                name="hamur"
                type="select"
                placeholder="---Hangi hamur olsun?---"
                value={data.hamur}
                onChange={changeHandler}
                data-cy="dough-dropdown"

              >
                <option value="ince" >
                  ince
                </option>
                <option value="orta" >
                  orta
                </option>
                <option value="kalın" >
                  kalın
                </option>

              </Input>
            </Col>
            <FormFeedback>{errors.hamur}</FormFeedback>
          </FormGroup>
        </div>


        <FormGroup >
          <h3>Ek Malzemeler:</h3>
          <p>En Fazla 10 malzeme seçebilirsiniz. 5tl</p>


          {secenekler.map((e, index) => {
            return (
              <div key={index}>
                <FormGroup check inline >

                  <Input
                    type="checkbox"
                    name={e}
                    onChange={kontrol}
                  />

                  <Label check>{e} </Label>
                  <FormFeedback>{errors.secenekler}</FormFeedback>
                </FormGroup>
              </div>
            );
          })}

        </FormGroup>


        <FormGroup>
          <Label htmlFor="special-text">
            <h3>Sipariş Notu : </h3>
          </Label>
          <Input
            id="special-text"
            name="instructions"
            placeholder="notunuzu yazınız"
            type="text"
            onChange={changeHandler}
            value={data.instructions}
            invalid={errors.instructions}
            data-cy="special-text"
          />
          <FormFeedback>{errors.instructions}</FormFeedback>
        </FormGroup>

        <hr style={{ size: "2", border: "solid", width: "100%" }} />

        <div className="sayısal">
          <ButtonToolbar >
            <ButtonGroup >
              <Button onClick={azalt}>
                -
              </Button>
              {' '}

              <Input
                id="count"
                type="number"
                value={counter} />
              {' '}

              <Button onClick={arttır} >
                +
              </Button>
            </ButtonGroup>
          </ButtonToolbar>



          <div className="seçim-2">
            <FormGroup >
              <Card className="my-5"
                style={{
                  width: '8rem'
                }}
              >
                <CardTitle> <h4 style={{ marginTop: 0 }}>Sipariş Toplamı</h4></CardTitle>
                <CardText>
                  <h5>Seçimler: {ekücret * counter} TL </h5>

                  <h5>Toplam: {totalPrice} TL </h5>
                </CardText>

              </Card>


              <Link to="/order">
                <button id="order-button" data-cy="order-button" disabled={disabled} >
                  Sipariş ver!
                </button>
              </Link>

            </FormGroup>


          </div>
        </div>


      </div>



    </form>
  );
}



export default Form;