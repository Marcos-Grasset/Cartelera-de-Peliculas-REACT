import React from "react";
import iconImage from "../images/icono.JPG";

function Footer() {
    return (
    <footer>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={iconImage} alt="Icono" style={{ width: "30px", height: "20px", margin: 0, padding: 0 }} />
        <p style={{ marginLeft: "8px" }}>
            © 2024 Cartelera de Peliculas - Sitio web creado por Marcos Grasset & Nicolás Ojeda - Todos los derechos reservados.
        </p>
        </div>
    </footer>
    );
}

export default Footer;
