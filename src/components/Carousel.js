import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación interna en React

import guason from '../images/guason.jpg';
import transformers from '../images/transformers.jpg';
import alien from '../images/alien.jpg';
import beetlejuice from '../images/beetlejuice.jpg';
import intensamente from '../images/intensamente.jpeg';
import sonrie from '../images/sonrie.jpeg';
import deadpool from '../images/deadpool.jpg';
import alice from '../images/alice.jpg';
import carnada from '../images/carnada.jpg';
import deepWeb from '../images/deep web.jpg';
import hellboy from '../images/hellboy.jpg';
import villano from '../images/mi villano favorito 4.jpg';

function Carousel() {
    const peliculasData = {
        "Guason 2 Folie a Deux": guason,
        "Transformers UNO": transformers,
        "Alien Romulus": alien,
        "Beetlejuice": beetlejuice,
        "Intensa Mente 2": intensamente,
        "Sonríe 2": sonrie,
        "Deadpool & Wolverine": deadpool,
        "Alice": alice,
        "Carnada": carnada,
        "Deep Web": deepWeb,
        "Hellboy": hellboy,
        "Mi Villano Favorito 4": villano,
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const peliculasVisibles = 5;
    const peliculasKeys = Object.keys(peliculasData);
    const navigate = useNavigate(); // Usa el hook useNavigate para navegación interna

    // Mueve el carrusel hacia adelante o hacia atrás
    const moveCarousel = (direction) => {
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + direction;
            if (newIndex < 0) {
                newIndex = peliculasKeys.length - 1; // Alcanza el final y vuelve al principio
            } else if (newIndex >= peliculasKeys.length) {
                newIndex = 0; // Vuelve al principio
            }
            return newIndex;
        });
    };

    const irAReseña = (pelicula) => {
        // Guarda la película seleccionada en el localStorage
        const peliculaData = {
            nombre: pelicula,
            imagen: peliculasData[pelicula],
        };
        localStorage.setItem("peliculaSeleccionada", JSON.stringify(peliculaData));

        // Navega a la ruta de reseña en lugar de cambiar de página directamente
        navigate(`/reseñar/${pelicula}`);
    };

    return (
        <div className="carousel-container">
            <button className="prev" onClick={() => moveCarousel(-1)}>&#10094;</button>
            <div className="carousel">
                {peliculasKeys.concat(peliculasKeys).slice(currentIndex, currentIndex + peliculasVisibles).map((key, index) => (
                    <div className="pelicula" key={index}>
                        <img src={peliculasData[key]} alt={key} />
                        <p>{key}</p>
                        <button onClick={() => irAReseña(key)}>Reseñar</button>
                    </div>
                ))}
            </div>
            <button className="next" onClick={() => moveCarousel(1)}>&#10095;</button>
        </div>
    );
}

export default Carousel;
