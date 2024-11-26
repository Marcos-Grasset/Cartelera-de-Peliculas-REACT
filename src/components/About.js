import React from "react";
import cineImg from "../images/cine.jpg";
import nuestraGif from "../images/Nuestra.gif";
import '../style.css';
import '../App.css';

const About = () => {
  return (
    <main>

      <h1><img src={nuestraGif} alt="Descripción de la imagen" className="header-img"/></h1>

      <div className="about-container">
        <img src={cineImg} alt="Imagen de cine" className="about-image" />
        <p className="texto-about">
          Bienvenidos a nuestra plataforma de reseñas de películas, un lugar
          creado para todos los amantes del cine. Nuestro sitio fue creado en el
          año 2024 con el objetivo darle un espacio a los fanaticos del cine
          para compartir sus propias opiniones y descubrir la perspectiva de
          otros usuarios, además de descubrir películas populares y nuevos
          estrenos. Nuestra comunidad está dedicada a construir un espacio en el
          que cada película pueda ser evaluada desde distintos puntos de vista,
          creando así una experiencia rica y diversa para todos los usuarios del
          sitio.
        </p>
        <p className="texto-about">
          Nuestra misión es conectar a personas apasionadas por el cine,
          fomentando el debate y la apreciación de cada obra, desde las grandes
          producciones hasta las joyas ocultas. ¡Únete y sé parte de nuestra
          comunidad cinéfila!
        </p>
      </div>
    </main>
  );
};

export default About;
