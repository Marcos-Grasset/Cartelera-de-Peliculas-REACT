import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importamos Auth para obtener el usuario actual
import reseñaspeliGif from "../images/ResenasPeli.gif";
import "../style.css";
import { db } from './firebase';

function Reseñas() {
  const [reseñas, setReseñas] = useState([]);

  // Cargar reseñas solo del usuario actual
  const cargarReseñas = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser; // Obtener el usuario autenticado

      if (!user) {
        console.error("No hay un usuario autenticado.");
        return;
      }

      // Obtener las reseñas desde Firestore
      const reseñasRef = collection(db, "reseñas");
      const snapshot = await getDocs(reseñasRef);

      // Filtrar solo las reseñas del usuario actual
      const reseñasUsuario = snapshot.docs
        .map(doc => doc.data())
        .filter(reseña => reseña.usuario === user.email); // Filtra por email

      setReseñas(reseñasUsuario);
    } catch (error) {
      console.error("Error al cargar las reseñas desde Firestore:", error);
    }
  };

  useEffect(() => {
    cargarReseñas(); // Cargar reseñas al montar el componente
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
          <p>No hay reseñas disponibles para tu cuenta. ¡Añade una reseña!</p>
        ) : (
          reseñas.map((reseña, index) => (
            <div key={index} className="reseña-card">
              <h2>{reseña.pelicula}</h2>

              {/* Mostrar estrellas */}
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

              {/* Mostrar comentario */}
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
