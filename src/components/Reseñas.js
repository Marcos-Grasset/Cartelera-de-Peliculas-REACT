import React, { useState, useEffect } from "react";
import reseñaspeliGif from "../images/ResenasPeli.gif";
import "../style.css";

function Reseñas() {
  const [reseñas, setReseñas] = useState([]);

  const cargarReseñas = () => {
    const reseñasGuardadas = JSON.parse(localStorage.getItem("reseñas")) || [];
    setReseñas(reseñasGuardadas);
  };

  useEffect(() => {
    cargarReseñas();

    // Escuchar cambios en localStorage cuando otro componente actualice las reseñas
    window.addEventListener("storage", cargarReseñas);
    return () => window.removeEventListener("storage", cargarReseñas);
  }, []);

  return (
    <div>
      <header>
        <h1>
          <img
            src={reseñaspeliGif}
            alt="Descripción de la imagen"
            className="header-img"
          />
        </h1>
      </header>

      <main id="main_reseñas">
        {reseñas.length === 0 ? (
          <p>No hay reseñas disponibles. ¡Añade una reseña!</p>
        ) : (
          reseñas.map((reseña, index) => (
            <div key={index} className="reseña-card">
              <h2>{reseña.pelicula}</h2>

              {/* Muestra la imagen de la película */}
              {reseña.imagen && (
                <img
                  src={reseña.imagen}
                  alt={`Imagen de ${reseña.pelicula}`}
                  className="pelicula-imagen"
                  style={{ width: 200, height: "auto", marginBottom: 10 }}
                />
              )}

              <div id="estrellas">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i + 1}
                    className="estrella"
                    style={{
                      color: i + 1 <= reseña.estrellas ? "gold" : "black",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="comentario-container">
                <strong className="comentario-label">Comentario:</strong>
                <textarea
                  className="comment"
                  readOnly
                  value={reseña.comentario}
                ></textarea>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default Reseñas;
