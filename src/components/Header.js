import React from "react";
import iconImage from "../images/icono.JPG";
import headerGif from "../images/cartelera.gif";
import '../style.css';

function Header() {
    return (
    <header>
        <h1>
        <img src={headerGif} alt="Descripción de la imagen" className="header-img" />
        </h1>
    </header>
    );
}
export default Header;
