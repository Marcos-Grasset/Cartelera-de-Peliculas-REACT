import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importa Firebase Auth

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDx4qn-hjJgi2ApfwLyVFJnW--l1BeH4WA",
    authDomain: "cartelera-9b051.firebaseapp.com",
    projectId: "cartelera-9b051",
    storageBucket: "cartelera-9b051.appspot.com", // Corrección del dominio
    messagingSenderId: "1075051147089",
    appId: "1:1075051147089:web:ad696232a40251b23dad70"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Función para guardar la reseña en Firestore
export const saveReviewToFirestore = async (reseña) => {
    try {
    await addDoc(collection(db, "reseñas"), reseña);
    console.log("Reseña guardada en Firestore");
    } catch (e) {
    console.error("Error al guardar la reseña en Firestore: ", e.message);
    }
};

// Exporta las instancias
export { db, auth };
export default app;
