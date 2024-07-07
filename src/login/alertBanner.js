import React from "react";

function AlertBanner({ color, message, closeAlert }) {
  return (
    <div className="flex alertBanner" style={{ backgroundColor: color }}>
      <span className="message">{message}</span>
      <div className="closeAlert" onClick={closeAlert}>
        X
      </div>
    </div>
  );
}

export default AlertBanner;
