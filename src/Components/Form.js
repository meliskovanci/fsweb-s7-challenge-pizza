import React from "react";
import {NavLink, Link } from "react-router-dom";
import "./Form.css";

      const Form = (props) => {
        const { form, setForm, submit, validate, errors } = props;


      const onSubmit = (event) => {
        event.preventDefault();
        submit();
    }  


      const handleChange = (event) => {
        const { type, name, value, checked } = event.target;

        const valueToUse = type === "checkbox" ? checked : value;
        validate(name, valueToUse);
        setForm({ ...form, [name]: valueToUse });
      };
  
      

      return (

      


      <form id="pizza-form" className="form-container" onSubmit={onSubmit}>
      <div className="navbar">
      <h1 className="order-title">Pizza Siparişi</h1>
      <div className="direction">
      <NavLink className="links" to="/">
            Anasayfa
          </NavLink>
          <NavLink id="order-pizza" className="links" to="/pizza">
            Sipariş oluştur
          </NavLink>
          </div>
          </div>

<div className="icerik-container">
        <div className="isim">
      <label className="label" htmlFor="name-input">
        İsim:
      </label>
      <input type="text" id="name-input" name="name" value={form.name} onChange={handleChange} />
      <div className="error-msg">{errors.name}</div>
      </div>

    
      <div className="option">
      <label className="label" htmlFor="size-dropdown">
        Boy:
      </label>
      <select id="size-dropdown" name="size" value={form.size} onChange={handleChange}>
        <option value="">---Hangi boy olsun?---</option>
        <option value="küçük">Küçük</option>
        <option value="orta">Orta</option>
        <option value="büyük">Büyük</option>
        
      </select>
      <label className="label" htmlFor="dough-dropdown">
        Hamur:
      </label>
      <select id="dough-dropdown" name="dough" value={form.dough} onChange={handleChange}>
        <option value="">---Hangi hamur olsun?---</option>
        <option value="ince">İnce</option>
        <option value="orta">Orta</option>
        <option value="kalın">Kalın</option>
        
      </select>
      </div>
      <div className="error-msg">{errors.size}</div>
      <p className="toppings-title">İçindekiler:</p>
      <div className="toppings">
        <div className="toppings-1">
          <div>
            <label htmlFor="pepperoni">Pepperoni</label>
            <input type="checkbox" id="pepperoni" name="pepperoni" checked={form.pepperoni} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="sosis">Sosis</label>
            <input type="checkbox" id="sosis" name="sosis" checked={form.sosis} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="Jambon">Jambon</label>
            <input type="checkbox" id="Jambon" name="Jambon" checked={form.Jambon} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="tavuk">Tavuk</label>
            <input type="checkbox" id="tavuk" name="tavuk" checked={form.Tavuk} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="soğan">Soğan</label>
            <input type="checkbox" id="soğan" name="soğan" checked={form.soğan} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="domates">Domates</label>
            <input type="checkbox" id="domates" name="domates" checked={form.domates} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="mısır">Mısır</label>
            <input type="checkbox" id="mısır" name="mısır" checked={form.mısır} onChange={handleChange} />
          </div>
        </div>
        <div className="toppings-2">
          <div>
            <label htmlFor="sucuk">Sucuk</label>
            <input type="checkbox" id="sucuk" name="sucuk" checked={form.sucuk} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="jalepeno">Jalepeno</label>
            <input type="checkbox" id="jalepeno" name="jalepeno" checked={form.jalepeno} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="sarımsak">Sarımsak</label>
            <input type="checkbox" id="sarımsak" name="sarımsak" checked={form.sarımsak} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="biber">Biber</label>
            <input type="checkbox" id="biber" name="biber" checked={form.biber} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="ananas">Ananas</label>
            <input type="checkbox" id="ananas" name="ananas" checked={form.ananas} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="kabak">Kabak</label>
            <input type="checkbox" id="kabak" name="kabak" checked={form.kabak} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="salam">Salam</label>
            <input type="checkbox" id="salam" name="salam" checked={form.salam} onChange={handleChange} />
          </div>
           </div>
           </div>
           <hr />

           
           <label className="label" htmlFor="special-text">
        Sipariş Notu
      </label>
       <input type="text" id="special-text" name="instructions" placeholder="Siparişine eklemek istediğin bir not var mı?" value={form.instructions} onChange={handleChange} />
          
           
     
      <label htmlFor="quantity">Adet:</label>
     <input type="number" id="quantity" name="quantity" placeholder="1" min="1" max="5" />

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