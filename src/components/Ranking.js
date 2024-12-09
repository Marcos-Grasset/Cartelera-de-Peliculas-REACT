import React, { useEffect, useState } from "react";
import rankingGif from "../images/Ranking de Películas.gif";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import "../style.css";

function Ranking() {
    const [ranking, setRanking] = useState([]);
    const user = auth.currentUser; // Obtener el usuario autenticado

    useEffect(() => {
        if (user) {
            cargarReseñas();
        }
    }, [user]);

    const cargarReseñas = async () => {
        try {
            const q = query(collection(db, "reseñas"), where("usuario", "==", user.email));
            const querySnapshot = await getDocs(q);
            const reseñas = [];

            querySnapshot.forEach((doc) => {
                reseñas.push({ id: doc.id, ...doc.data() });
            });

            setRanking(reseñas);
        } catch (error) {
            console.error("Error al cargar las reseñas:", error);
        }
    };

    const editarReseña = async (id) => {
        const nuevaEstrella = parseInt(prompt("Editar estrellas (1-5):"), 10);
        const nuevoComentario = prompt("Editar comentario:");

        if (!isNaN(nuevaEstrella) && nuevaEstrella >= 1 && nuevaEstrella <= 5 && nuevoComentario) {
            const reseñaRef = doc(db, "reseñas", id);

            await updateDoc(reseñaRef, {
                estrellas: nuevaEstrella,
                comentario: nuevoComentario,
            });

            alert("Reseña actualizada.");
            cargarReseñas();
        } else {
            alert("Entrada inválida.");
        }
    };

    const eliminarReseña = async (id) => {
        const reseñaRef = doc(db, "reseñas", id);
        await deleteDoc(reseñaRef);
        alert("Reseña eliminada.");
        cargarReseñas();
    };

    const agregarReseña = async (pelicula) => {
        const nuevaEstrella = parseInt(prompt("Estrellas (1-5):"), 10);
        const nuevoComentario = prompt("Comentario:");

        if (!isNaN(nuevaEstrella) && nuevaEstrella >= 1 && nuevaEstrella <= 5 && nuevoComentario) {
            const reseñaRef = doc(db, "reseñas", `${user.email}_${pelicula}`);

            await setDoc(reseñaRef, {
                usuario: user.email,
                pelicula,
                estrellas: nuevaEstrella,
                comentario: nuevoComentario,
            });

            alert("Reseña guardada.");
            cargarReseñas();
        } else {
            alert("Entrada inválida.");
        }
    };

    return (
        <section id="ranking">
            <h2>
                <img src={rankingGif} alt="Gif de ranking" className="gif-header" />
            </h2>
            <div className="ranking-container">
                {ranking.length > 0 ? (
                    <div className="ranking-card">
                        {ranking.map((reseña) => (
                            <div key={reseña.id} className="ranking-item">
                                <div>
                                    <strong>{reseña.pelicula}</strong>:{" "}
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} style={{ color: i < reseña.estrellas ? "gold" : "black" }}>
                                            ★
                                        </span>
                                    ))}
                                    <p>{reseña.comentario}</p>
                                </div>
                                <div>
                                    <button className="button-editar" onClick={() => editarReseña(reseña.id)}>
                                        Editar
                                    </button>
                                    <button className="button-eliminar" onClick={() => eliminarReseña(reseña.id)}>
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
            <button className="boton-agregar" onClick={() => agregarReseña(prompt("Nombre de la película:"))}>
            Agregar Reseña
            </button>

        </section>
    );
}

export default Ranking;
