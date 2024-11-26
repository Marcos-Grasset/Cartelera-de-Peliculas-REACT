import React, { useState } from "react";
import contactoGif from "../images/Contacto.gif";
import '../style.css';
import '../App.css';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Formulario enviado:", formData);

        setSubmittedData(formData);

        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main>
     
        <h1><img src={contactoGif} alt="Descripción de la imagen" className="header-img"/></h1>

        <div className="contact-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="message">Mensaje:</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit">Enviar</button>
            </form>
            
            {submittedData && (
                <div className="submitted-data">
                    <h3>Datos Enviados:</h3>
                    <p><strong>Nombre:</strong> {submittedData.name}</p>
                    <p><strong>Correo electrónico:</strong> {submittedData.email}</p>
                    <p><strong>Mensaje:</strong> {submittedData.message}</p>
                </div>
            )}
        </div>
        </main>
    );
};

export default Contacto;