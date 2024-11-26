import React, { useEffect, useState } from "react";
import rankingGif from '../images/Ranking de Películas.gif';
import '../style.css';

function Ranking() {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        // localStorage.clear(); // Esto borra todo el `localStorage`
        if (!localStorage.getItem("reseñas")) {
            const reseñasEjemplo = [
                { pelicula: "Guason 2 Folie a Deux", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Transformers UNO", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Alien Romulus", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Beetlejuice", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Intensa Mente 2", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Sonríe 2", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Deadpool & Wolverine", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Alice", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Carnada", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Deep Web", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Hellboy", estrellas: 0, comentario: "No hay reseña disponible." },
                { pelicula: "Mi Villano Favorito 4", estrellas: 0, comentario: "No hay reseña disponible." },
            ];
            localStorage.setItem("reseñas", JSON.stringify(reseñasEjemplo));
        }

        actualizarRanking();
    }, []);

    const actualizarRanking = () => {
        const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
        if (reseñas.length === 0) {
            setRanking([]);
            return;
        }

        const puntuaciones = {};
        reseñas.forEach((reseña) => {
            if (!puntuaciones[reseña.pelicula]) {
                puntuaciones[reseña.pelicula] = { total: 0, count: 0, comentario: reseña.comentario };
            }
            puntuaciones[reseña.pelicula].total += reseña.estrellas;
            puntuaciones[reseña.pelicula].count++;
        });

        const sortedMovies = Object.keys(puntuaciones).sort((a, b) => 
            (puntuaciones[b].total / puntuaciones[b].count) - (puntuaciones[a].total / puntuaciones[a].count)
        );

        setRanking(
            sortedMovies.map(movie => ({
                name: movie,
                avgStars: Math.round(puntuaciones[movie].total / puntuaciones[movie].count),
                comentario: puntuaciones[movie].comentario
            }))
        );
    };

    function editarReseña(pelicula) {
        const reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
        const reseña = reseñas.find(r => r.pelicula === pelicula);
        if (reseña) {
            const nuevoComentario = prompt('Editar comentario:', reseña.comentario);
            const nuevasEstrellas = parseInt(prompt('Editar estrellas (1-5):', reseña.estrellas), 10);

            if (nuevoComentario && !isNaN(nuevasEstrellas) && nuevasEstrellas >= 1 && nuevasEstrellas <= 5) {
                reseña.comentario = nuevoComentario;
                reseña.estrellas = nuevasEstrellas;

                localStorage.setItem('reseñas', JSON.stringify(reseñas));
                alert('Reseña actualizada');
                actualizarRanking();
                
                // Notificar cambios en localStorage
                window.dispatchEvent(new Event("storage"));
            } else {
                alert('Número inválido. Asegúrate de ingresar una puntuación entre 1 y 5.');
            }
        } else {
            alert('Reseña no encontrada.');
        }
    }

    function eliminarReseña(pelicula) {
        let reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
        const reseñaIndex = reseñas.findIndex(r => r.pelicula === pelicula);

        if (reseñaIndex !== -1) {
            reseñas.splice(reseñaIndex, 1);
            localStorage.setItem('reseñas', JSON.stringify(reseñas));

            alert('Reseña eliminada.');
            actualizarRanking();

            // Notificar cambios en localStorage
            window.dispatchEvent(new Event("storage"));
        } else {
            alert('Reseña no encontrada.');
        }
    }

    return (
        <section id="ranking">
            <h2>
                <img
                    src={rankingGif}
                    alt="Gif de ranking"
                    className="gif-header"
                />
            </h2>
            <div className="ranking-container">
                {ranking.length > 0 ? (
                    <div className="ranking-card">
                        {ranking.map((pelicula, index) => (
                            <div key={index} className="ranking-item">
                                <div>
                                    <strong>{pelicula.name}</strong>:{" "}
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            style={{ color: i < pelicula.avgStars ? "gold" : "black" }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <p>{pelicula.comentario}</p>
                                </div>
                                <div>
                                    <button
                                        className="button-editar"
                                        onClick={() => editarReseña(pelicula.name)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="button-eliminar"
                                        onClick={() => eliminarReseña(pelicula.name)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay películas en el ranking.</p>
                )}
            </div>
        </section>
    );
}

export default Ranking;
