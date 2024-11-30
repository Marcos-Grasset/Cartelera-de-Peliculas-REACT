import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebase'; // Importa la instancia de Firebase ya inicializada
import { useNavigate } from 'react-router-dom';
import headerGif from "../images/cartelera.gif";

// Obtén la instancia de autenticación desde Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const navigate = useNavigate(); // Hook para redirección

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Usuario autenticado:', result.user);
            navigate('/'); // Redirige a la página principal tras iniciar sesión
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className="login-container">
            <img src={headerGif} alt="Cartelera de Películas" className="header-img" />
            <p>¡Bienvenido a nuestra comunidad cinéfila! Aquí podrás explorar, compartir y sumergirte en el apasionante mundo de las reseñas de cine. Descubre películas que te emocionen, analiza los clásicos que han marcado generaciones y da tu opinión sobre los últimos estrenos. Únete a nosotros para vivir la magia del séptimo arte desde una perspectiva única. ¿Estás listo para embarcarte en esta aventura cinematográfica?</p>
            <button onClick={handleSignIn}>Iniciar sesión con Google</button>
        </div>
    );
};

export default Login;
