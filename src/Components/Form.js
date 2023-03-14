import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Form.css";
import * as yup from "yup";
import {
  FormGroup, CardTitle, Card, CardText,
  ButtonToolbar, ButtonGroup, Button, Input, Label, Col
} from "reactstrap"



const initialValues = {
  name: "",
  size: "",
  dough: "",
  instructions: "",
  adet: 1,
  ücret: 85.50,
  ekücret: ""
}

const initialErrors = {
  name: "",
  size: "",
  dough: "",
  instructions: "",
  adet: "",
  ücret: "",
  ekücret: ""
}


const seçenekler = [
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
    schema.isValid(data).then((valid) => setDisabled(!valid));
  }, [data]);


  const schema = yup.object().shape({
    name: yup
      .string()
      .required("bu alanı doldurmak zorunludur.")
      .min(2, "isim en az 2 karakter olmalıdır"),
    size: yup
      .mixed()
      .oneOf(["Küçük", "Orta", "Büyük"], "Bir tanesini seçmelisiniz.")
      .required("Seçim yapınız"),
    dough: yup
      .mixed()
      .oneOf(
        ["ince", "orta", "kalın"],
        "Bir tanesini seçmelisiniz."
      )
      .required("Seçim yapınız"),

    // pepperoni: yup.boolean().oneOf([true, false], ""),
    // sosis: yup.boolean().oneOf([true, false], ""),
    // Jambon: yup.boolean().oneOf([true, false], ""),
    // tavuk: yup.boolean().oneOf([true, false], ""),
    // soğan: yup.boolean().oneOf([true, false], ""),
    // domates: yup.boolean().oneOf([true, false], ""),
    // mısır: yup.boolean().oneOf([true, false], ""),
    // sucuk: yup.boolean().oneOf([true, false], ""),
    // jalepeno: yup.boolean().oneOf([true, false], ""),
    // sarımsak: yup.boolean().oneOf([true, false], ""),
    // biber: yup.boolean().oneOf([true, false], ""),
    // ananas: yup.boolean().oneOf([true, false], ""),
    // kabak: yup.boolean().oneOf([true, false], ""),
    // salam: yup.boolean().oneOf([true, false], ""),
    // instructions: yup.string(),

    adet: yup
      .number()
      .required("fazla seçim yapabilirsiniz.")
      .min(1, "Bir adetten fazla seçebilirsiniz"),

    ücret: yup
      .number()
      .required()
      .min(85.50, "Ek seçeneklerle fiyat artacaktır."),

    ekücret: yup
      .number()
      .required()
      .min(0, "Seçimleriniz fiyata eklenecektir."),

  });

  const [price, setPrice] = useState(data.ücret);
  const [counter, setCounter] = useState(1);
  const [malzemeSayısı, setMalzemeSayısı] = useState(0);
  const perCost = 5;
  const ekücret = perCost * malzemeSayısı
  const totalPrice = (ekücret + price) * counter



  const setCheck = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
    if (e.target.checked === true) {
      setMalzemeSayısı(malzemeSayısı + 1);
      setPrice(price + perCost);
    } else {
      setMalzemeSayısı(malzemeSayısı - 1);
      setPrice(price - perCost);
    }

  }


  useEffect(() => {
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


  const onSubmit = (event) => {
    event.preventDefault();
    submit();
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



  return (
    <form id="pizza-form" className="form-container" onSubmit={onSubmit}>
      <div className="navbar">
        <h1 className="order-title">Pizza Siparişi</h1>
        <div className="direction">
          <NavLink className="links" to="/">
            Anasayfa
          </NavLink>

          <NavLink className="seçenekler" to="/pizza">
            Seçenekler
          </NavLink>

          <NavLink id="order-pizza" className="links" to="/pizza">
            Sipariş oluştur
          </NavLink>
        </div>
      </div>

      <div className="icerik-container">
        <div className="pizza-info">
          Position Absolute Pizza
        </div>


        <FormGroup>
          <Label htmlFor="name-input">
            isim:
          </Label>
          <Input
            id="name-input"
            name="name"
            placeholder="isim yazınız"
            type="text"
          />
        </FormGroup>

        {/*         
        <div className="radio" >
          <label htmlFor="kucuk">
            <input id="kucuk" type="radio" name="boyut" />
            Küçük
          </label>
        </div>
        <div className="radio" >
          <label htmlFor="orta">
            <input id="orta" type="radio" name="boyut"  />
            Orta
          </label>
        </div>
        <div className="radio"  >
          <label htmlFor="büyük">
            <input id="büyük" type="radio" name="boyut"  />
            Büyük
          </label>
        </div> */}

        <p>Boy:</p>

        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> kücük
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> orta
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> büyük
          </Label>
        </FormGroup>


        {/* <label className="label" htmlFor="dough-dropdown">
          Hamur:
        </label>
        <select id="dough-dropdown" name="dough" value={data.dough} onChange={handleChange}>
          <option value="">---Hangi hamur olsun?---</option>
          <option value="ince">İnce</option>
          <option value="orta">Orta</option>
          <option value="kalın">Kalın</option>

        </select> */}

        <FormGroup row>
          <Label
            htmlFor="dough-dropdown"

            sm={2}
          >
            Hamur:
          </Label>
          <Col sm={20}>
            <Input
              id="dough-dropdown"
              name="select"
              type="select"
              placeholder="---Hangi hamur olsun?---"
            >
              <option value="ince">
                ince
              </option>
              <option value="orta">
                orta
              </option>
              <option value="kalın">
                kalın
              </option>

            </Input>
          </Col>
        </FormGroup>


        <FormGroup >
          <p>Ek Malzemeler:</p>
          <p>En Fazla 10 malzeme seçebilirsiniz. 5tl</p>

          {seçenekler.map((e, index) => {
            return (
              <FormGroup check inline>
                <Input
                  type="checkbox"
                  name={e}
                  key={index}
                  onChange={setCheck}
                />
                <Label check>{e}</Label>
              </FormGroup>
            );
          })}
        </FormGroup>


        <FormGroup>
          <Label htmlFor="special-text">
            Sipariş Notu
          </Label>
          <Input
            id="special-text"
            name="instructions"
            placeholder="notunuzu yazınız"
            type="text"
          />
        </FormGroup>

     <div className="count">
        <ButtonToolbar>
          <ButtonGroup >
            <Button onClick={azalt}>
              -
            </Button>

            <Input
              type="number"
              
              value={counter} />

            <Button onClick={arttır}>
              +
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        </div> 
      


      <FormGroup >
        <Card
          body
          className="my-2"
          style={{
            width: "20px",
          }}
        >
          <CardTitle tag="h5">Sipariş Toplamı</CardTitle>
          <CardText>
            Seçimler: {ekücret} TL
            <br></br>
            <span>Toplam: {totalPrice} TL </span>
          </CardText>
        </Card>
      </FormGroup>
      </div>

      <Link to="/order">
        <button id="order-button"  >
          Sipariş ver!
        </button>
      </Link>

    </form>
  );


}

export default Form;