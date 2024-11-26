import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Index from './components/Index';
import Reseñar from './components/Reseñar';
import About from './components/About';
import Contacto from './components/Contacto';
import Footer from "./components/Footer";
import Reseñas from "./components/Reseñas";
import "./style.css";

function App() {
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
          <Route path="/Reseñar/:pelicula" element={<Reseñar />} /> {/* Cambiado para aceptar parámetro */}
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
