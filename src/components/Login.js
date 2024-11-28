import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import app from './firebase'; // Importa la instancia de Firebase ya inicializada

// Obtén la instancia de autenticación desde Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listener para el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Limpia el listener al desmontar el componente
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Usuario autenticado:', result.user);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('Sesión cerrada');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <p>Bienvenido, {user.displayName}</p>
                    <button onClick={handleSignOut}>Cerrar sesión</button>
                </>
            ) : (
                <>
                    <p>Intentelo nuevamente</p>
                    <button onClick={handleSignIn}>Iniciar sesión con Google</button>
                </>
            )}
        </div>
    );
};

export default Login;
