import React from "react";
import "./buttons.css";
import LoaderIcon from "./loader";

const BoxButtons = ({
  text,
  size,
  icon,
  backgroundColor,
  action,
  update,
  id,
  condition,
  radius
}) => {
  return (
    <div className="container" id={id}>
      <button className="cta" onClick={() => update(id)} 
      style={{ backgroundColor: backgroundColor ?? "grey",
       height:radius, 
       width:radius}}
      >
        <div className="fas fa-plus">
        {condition ? (
          <LoaderIcon radius={5} />
        ) :( icon ?? "🗑️")}</div>
          <span className="button-text">{text ?? "button"}</span>
      </button>
    </div>
  );
};

export default BoxButtons;
