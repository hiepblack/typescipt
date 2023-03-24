import React from "react";
import "./style.css";

const Box = ({ item, handleClick, index, checkWinner }) => {
  let color = "";
  for (let i = 0; i < checkWinner.length; i++) {
    if (checkWinner[i] === index) {
      color = "yellow";
    }
  }
  return (
    <button
      onClick={() => handleClick(index)}
      style={{ backgroundColor: `${color}` }}
    >
      {item}
    </button>
  );
};

export default Box;
