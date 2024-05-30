import React from 'react';
import './Popup.css'
const Popup = ({ onClose, children }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
