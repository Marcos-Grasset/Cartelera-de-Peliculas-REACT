import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import Index from './components/Index';
import Reseñar from './components/Reseñar';
import About from './components/About';
import Contacto from './components/Contacto';
import Footer from "./components/Footer";
import Reseñas from "./components/Reseñas";
import Login from "./components/Login";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "./style.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listener para cambios en el estado de autenticación
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  // Si no está autenticado, redirigir a la pantalla de Login
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  // Si el usuario está autenticado, renderizar el sitio completo
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/Reseñas">Reseñas</Link></li>
            <li><Link to="/About">Acerca de</Link></li>
            <li><Link to="/Contacto">Contacto</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Reseñar/:pelicula" element={<Reseñar />} />
          <Route path="/Reseñas" element={<Reseñas />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contacto" element={<Contacto />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
