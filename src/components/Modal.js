import React from "react";
import "../style.css";

function Modal({ title, children, onClose, onConfirm, confirmText = "Guardar" }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <div className="modal-body">{children}</div>
                <div className="modal-buttons">
                    <button className="button-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="button-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
