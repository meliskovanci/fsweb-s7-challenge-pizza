import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";




const Home = () => {
  return (
    <div className="home-container">
      <h1>Teknolojik Yemekler</h1>
      <p>KOD ACIKTIRIR</p>
      <p>PİZZA DOYURUR</p>
     
     
     <Link id="order-pizza" to="/pizza" data-cy="order-pizza">
        <button className="order-btn">ACIKTIM</button>
      </Link>
      <img className="pizza-img" src="./banner.png" alt="pizza" />



    </div>
    
  );
};
export default Home;