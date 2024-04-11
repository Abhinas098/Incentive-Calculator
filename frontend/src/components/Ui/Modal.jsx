import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ children, closeModal, className }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.modalContent} ${className}`}>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
