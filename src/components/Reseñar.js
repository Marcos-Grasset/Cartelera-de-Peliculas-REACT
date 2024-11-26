import React, { useState, useEffect } from 'react';
import reseñarGif from '../images/reseñar.gif';
import '../style.css';

function Reseñar() {
    const [peliculaData, setPeliculaData] = useState(null);
    const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState(0);
    const [comentario, setComentario] = useState('');
    const [reseñas, setReseñas] = useState([]);

    useEffect(() => {
    const pelicula = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
    setPeliculaData(pelicula);

    const reseñasGuardadas = JSON.parse(localStorage.getItem("reseñas")) || [];
    setReseñas(reseñasGuardadas);

    const reseñaExistente = reseñasGuardadas.find(
    (reseña) => reseña.pelicula === pelicula?.nombre
    );

    if (reseñaExistente) {
    setComentario(reseñaExistente.comentario);
    setPuntuacionSeleccionada(reseñaExistente.estrellas);
    }
}, []);

    const seleccionarPuntuacion = (valor) => {
    setPuntuacionSeleccionada(valor);
};

    const guardarReseña = () => {
    if (puntuacionSeleccionada > 0 && comentario.trim()) {
        const nuevaReseñas = [...reseñas];
        const indiceReseña = nuevaReseñas.findIndex(
        (reseña) => reseña.pelicula === peliculaData.nombre
        );

    if (indiceReseña !== -1) {
        nuevaReseñas[indiceReseña] = { ...nuevaReseñas[indiceReseña], comentario, estrellas: puntuacionSeleccionada };
    } else {
        nuevaReseñas.push({ pelicula: peliculaData.nombre, estrellas: puntuacionSeleccionada, comentario });
    }

        localStorage.setItem("reseñas", JSON.stringify(nuevaReseñas));
        alert("Reseña guardada.");
        window.location.href = "/"; // Adjust to your root or specific route
    } else {
        alert("Por favor, seleccione una puntuación y escriba un comentario antes de guardar.");
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
            <img id="pelicula-imagen" src={peliculaData.imagen} alt="Imagen de la película" style={{ width: 200, height: 'auto' }} />
            <h2 id="pelicula-nombre">{peliculaData.nombre}</h2>
        </>
        )}
        
        <div id="estrellas">
        {[...Array(5)].map((_, i) => (
            <span
            key={i + 1}
            className="estrella"
            style={{ color: i + 1 <= puntuacionSeleccionada ? "gold" : "black" }}
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
        
        <button id="guardar-reseña" onClick={guardarReseña}>Guardar Reseña</button>
    </main>

    </div>
    );
}

export default Reseñar;
