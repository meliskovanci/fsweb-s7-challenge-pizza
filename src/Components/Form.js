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
  instructions: "",
  adet: 1,
  ücret: 85.50,
  ekücret: ""
}

const initialErrors = {
  name: "",
  boyut: "",
  hamur: "",
  instructions: "",
 
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

  const [price, setPrice] = useState(data.ücret);
  const [counter, setCounter] = useState(1);
  const [malzemeSayısı, setMalzemeSayısı] = useState(0);
  const perCost = 5;
  const ekücret = perCost * malzemeSayısı
  const totalPrice = (ekücret + price) * counter



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

  useEffect(() => {
    schema.isValid(data).then((valid) => setDisabled(!valid));
  }, [data]);

  useEffect(() => {
    console.log("hi",data)
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
    console.log("errors >",errors);
  }, [errors]);



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
            onChange={changeHandler}
            
          />
         
        </FormGroup>

        

        <p>Boy:</p>

        <FormGroup check htmlFor="size-dropdown" invalid={errors.boyut} >
          <Label check>
            <Input type="radio" name="boyut" id="size-dropdown" value="Küçük" onChange={changeHandler} /> Küçük
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check htmlFor="size-dropdown">
            <Input type="radio" name="boyut" id="size-dropdown" value="Orta" onChange={changeHandler} /> Orta
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check htmlFor="size-dropdown">
            <Input type="radio" name="boyut" id="size-dropdown" value="Büyük" onChange={changeHandler} /> Büyük
          </Label>
          <FormFeedback>{errors.boyut}</FormFeedback>
        </FormGroup>


        {/* <label className="label" htmlFor="dough-dropdown">
          Hamur:
        </label>
        <select id="dough-dropdown" name="hamur" value={data.hamur} onChange={changeHandler}>
          <option value="">---Hangi hamur olsun?---</option>
          <option value="ince">İnce</option>
          <option value="orta">Orta</option>
          <option value="kalın">Kalın</option>

        </select>  */}

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
              name="hamur"
              type="select"
              placeholder="---Hangi hamur olsun?---"
              value={data.hamur}
              onChange={changeHandler}
              
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

        
        <FormGroup >
          <p>Ek Malzemeler:</p>
          <p>En Fazla 10 malzeme seçebilirsiniz. 5tl</p>

          
          {seçenekler.map((e, index) => {
            return (
              <div key={index}> 
              <FormGroup check inline >
                
                <Input
                  type="checkbox"
                  name={e}
                  onChange={kontrol}
                />


                <Label check>{e}</Label>
               
              </FormGroup>
              </div>
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
            onChange={changeHandler}
            invalid={errors.instructions}
          />
           <FormFeedback>{errors.instructions}</FormFeedback>
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
        <button id="order-button" disabled={disabled} >
          Sipariş ver!
        </button>
      </Link>

    </form>
  );
        }
  


export default Form;