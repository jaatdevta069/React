import React from "react";
import "./buttons.css";
import Loader from "../loader/loader";
import 'boxicons';

const BoxButtons = ({
  icon,
  backgroundColor,
  update,
  id,
  condition,
  hide
}) => {
  return (
    <div className="action" id={id} onClick={() => update(id)} style={{display:(hide ? "none":"block")}}>
      {condition ? (
          <Loader size={11} />
         ): 
       <box-icon name = {icon} size = '2em' color = {backgroundColor ?? "gold"} ></box-icon>} 
    </div>
  );
};

export default BoxButtons;
