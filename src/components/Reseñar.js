import React, { useState, useEffect } from 'react';
import { saveReviewToFirestore } from './firebase';
import { db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore';
import reseñarGif from '../images/reseñar.gif';
import '../style.css';

function Reseñar() {
  const [peliculaData, setPeliculaData] = useState(null);
  const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState(0);
  const [comentario, setComentario] = useState('');
  const [reseñas, setReseñas] = useState([]);
  const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario actual

  const auth = getAuth();

  // Listener para detectar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user); // Guarda el usuario actual en el estado
      } else {
        setUsuario(null);
        setReseñas([]); // Limpia las reseñas si no hay usuario
      }
    });
    return () => unsubscribe(); // Limpia el listener al desmontar
  }, [auth]);

  // Cargar película seleccionada desde localStorage
  useEffect(() => {
    const pelicula = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
    setPeliculaData(pelicula);
  }, []);

  // Cargar reseñas del usuario actual desde Firestore
  useEffect(() => {
    const cargarReseñas = async () => {
      if (usuario) {
        try {
          const querySnapshot = await getDocs(collection(db, 'reseñas'));
          const reseñasData = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((reseña) => reseña.usuario === usuario.email); // Filtra por usuario actual

          setReseñas(reseñasData);

          // Verificar si ya existe una reseña para la película
          const reseñaExistente = reseñasData.find(
            (reseña) => reseña.pelicula === peliculaData?.nombre
          );
          if (reseñaExistente) {
            setComentario(reseñaExistente.comentario);
            setPuntuacionSeleccionada(reseñaExistente.estrellas);
          }
        } catch (error) {
          console.error("Error al cargar las reseñas:", error);
        }
      }
    };

    cargarReseñas();
  }, [usuario, peliculaData]);

  // Función para seleccionar puntuación
  const seleccionarPuntuacion = (valor) => {
    setPuntuacionSeleccionada(valor);
  };

  // Función para guardar la reseña en Firestore
  const guardarReseña = async () => {
    if (puntuacionSeleccionada > 0 && comentario.trim()) {
      if (!usuario) {
        alert("Debes iniciar sesión para guardar una reseña.");
        return;
      }

      const nuevaReseña = {
        pelicula: peliculaData.nombre,
        estrellas: puntuacionSeleccionada,
        comentario,
        usuario: usuario.email, // Guarda el correo del usuario
      };

      try {
        await saveReviewToFirestore(nuevaReseña);
        alert('Reseña guardada correctamente.');
        window.location.href = '/'; // Redirige a la página principal
      } catch (error) {
        console.error("Error al guardar la reseña:", error);
      }
    } else {
      alert('Por favor, selecciona una puntuación y escribe un comentario.');
    }
  };

  return (
    <div>
      <header>
        <h1>
          <img src={reseñarGif} alt="Descripción de la imagen" className="header-img" />
        </h1>
      </header>

      <main id="main_reseña">
        {peliculaData && (
          <>
            <img
              id="pelicula-imagen"
              src={peliculaData.imagen}
              alt="Imagen de la película"
              style={{ width: 200, height: 'auto' }}
            />
            <h2 id="pelicula-nombre">{peliculaData.nombre}</h2>
          </>
        )}

        <div id="estrellas">
          {[...Array(5)].map((_, i) => (
            <span
              key={i + 1}
              className="estrella"
              style={{ color: i + 1 <= puntuacionSeleccionada ? 'gold' : 'black' }}
              onClick={() => seleccionarPuntuacion(i + 1)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          id="comentario"
          placeholder="Escribe tu comentario aquí"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <button id="guardar-reseña" onClick={guardarReseña}>
          Guardar Reseña
        </button>
      </main>
    </div>
  );
}

export default Reseñar;
