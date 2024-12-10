import React, { useEffect, useState } from "react"; 
import rankingGif from "../images/Ranking de Películas.gif";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import Modal from "./Modal"; // Importar el modal
import "../style.css";

function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [modalData, setModalData] = useState(null); // Controla el modal abierto
    const user = auth.currentUser;

    useEffect(() => {
        if (user) cargarReseñas();
    }, [user]);

    const cargarReseñas = async () => {
        try {
            const q = query(collection(db, "reseñas"), where("usuario", "==", user.email));
            const querySnapshot = await getDocs(q);
            const reseñas = [];
            querySnapshot.forEach((doc) => reseñas.push({ id: doc.id, ...doc.data() }));
            setRanking(reseñas);
        } catch (error) {
            console.error("Error al cargar las reseñas:", error);
        }
    };

    const abrirModal = (action, id = null, pelicula = "") => {
        setModalData({ action, id, pelicula, estrellas: 0, comentario: "" });
    };

    const cerrarModal = () => setModalData(null);

    const confirmarModal = async () => {
        if (modalData.action === "editar" || modalData.action === "agregar") {
            const { id, estrellas, comentario, pelicula } = modalData;
            if (estrellas >= 1 && estrellas <= 5 && comentario) {
                const reseñaRef = id
                    ? doc(db, "reseñas", id)
                    : doc(db, "reseñas", `${user.email}_${pelicula}`);
                await setDoc(reseñaRef, {
                    usuario: user.email,
                    pelicula,
                    estrellas: parseInt(estrellas, 10),
                    comentario,
                });
            }
        } else if (modalData.action === "eliminar") {
            const reseñaRef = doc(db, "reseñas", modalData.id);
            await deleteDoc(reseñaRef);
        }
        cargarReseñas();
        cerrarModal();
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
                                        <span key={i} style={{ color: i < reseña.estrellas ? "gold" : "black" }}>★</span>
                                    ))}
                                    <p>{reseña.comentario}</p>
                                </div>
                                <div>
                                    <button
                                        className="button-editar"
                                        onClick={() => abrirModal("editar", reseña.id, reseña.pelicula)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="button-eliminar"
                                        onClick={() => abrirModal("eliminar", reseña.id)}
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
            <button className="boton-agregar" onClick={() => abrirModal("agregar")}>
                Agregar Reseña
            </button>

            {modalData && (
                <Modal
                    title={
                        modalData.action === "editar"
                            ? "Editar Reseña"
                            : modalData.action === "agregar"
                            ? "Agregar Reseña"
                            : "Eliminar Reseña"
                    }
                    onClose={cerrarModal}
                    onConfirm={confirmarModal}
                    confirmText={modalData.action === "eliminar" ? "Eliminar" : "Guardar"}
                >
                    {modalData.action === "eliminar" ? (
                        <p>¿Estás seguro de que quieres eliminar esta reseña?</p>
                    ) : (
                        <>
                            <div id="estrellas">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i + 1}
                                        className="estrella"
                                        style={{
                                            color: i + 1 <= modalData.estrellas ? "gold" : "black",
                                            fontSize: "24px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setModalData({ ...modalData, estrellas: i + 1 })}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea
                                placeholder="Comentario"
                                value={modalData.comentario}
                                onChange={(e) => setModalData({ ...modalData, comentario: e.target.value })}
                                rows="5"
                                className="textarea-comentario"
                            ></textarea>
                        </>
                    )}
                </Modal>
            )}
        </section>
    );
}

export default Ranking;
