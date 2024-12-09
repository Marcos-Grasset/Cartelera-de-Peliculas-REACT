import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import app from './firebase'; // Importa la instancia de Firebase ya inicializada
import { useNavigate } from 'react-router-dom';
import headerGif from "../images/cartelera.gif";

// Obtén la instancia de autenticación desde Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [user, setUser] = useState(null); // Estado para guardar los datos del usuario
    const navigate = useNavigate(); // Hook para redirección

    // Función para manejar el inicio de sesión con Google
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Usuario autenticado:', result.user);
            setUser(result.user); // Guarda el usuario en el estado
            navigate('/'); // Redirige a la página principal tras iniciar sesión
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    // Controlamos el estado de autenticación para redirigir si el usuario ya está logueado
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser); // Actualiza el estado si el usuario ya está autenticado
        } else {
            setUser(null); // Si no hay usuario, lo establecemos como null
        }
    });

    return (
        <div className="login-container">
            <img src={headerGif} alt="Cartelera de Películas" className="header-img" />
            <p>¡Bienvenido a nuestra comunidad cinéfila! Aquí podrás explorar, compartir y sumergirte en el apasionante mundo de las reseñas de cine. Descubre películas que te emocionen, analiza los clásicos que han marcado generaciones y da tu opinión sobre los últimos estrenos. Únete a nosotros para vivir la magia del séptimo arte desde una perspectiva única. ¿Estás listo para embarcarte en esta aventura cinematográfica?</p>
            {!user ? (
                <button onClick={handleSignIn}>Iniciar sesión con Google</button> // Muestra el botón si el usuario no está logueado
            ) : (
                <p>¡Bienvenido, {user.displayName}!</p> // Muestra el nombre del usuario si está logueado
            )}
        </div>
    );
};

export default Login;
