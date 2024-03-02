// src/components/Popup.js
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CardDescription = ({ name, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        className="button is-secondary is-fullwidth mt-3"
        onClick={togglePopup}
      >
        Show descripction
      </button>

      {isVisible && (
        <div className="modal is-active p-4">
          <div className="modal-background" onClick={togglePopup}></div>
          <div className="modal-content">
            <div className="box">
              <h2 className="title is-4">{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={togglePopup}
          ></button>
        </div>
      )}
    </div>
  );
};

export { CardDescription };
