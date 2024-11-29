import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebase'; // Importa la instancia de Firebase ya inicializada
import { useNavigate } from 'react-router-dom';

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
            <h2>Iniciar sesión</h2>
            <button onClick={handleSignIn}>Iniciar sesión con Google</button>
        </div>
    );
};

export default Login;
