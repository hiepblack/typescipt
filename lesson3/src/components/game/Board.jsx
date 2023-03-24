import React from "react";
import "./style.css";
import Box from "./Box";

const Board = ({ cells, handleClick,checkWinner,winner }) => {
  return (
    <div className="board">
      {cells.map((item, index) => {
        return (
          <Box
            item={item}
            key={index}
            handleClick={() => handleClick(index)}
            index={index}
            checkWinner={checkWinner}
          />
        );
      })}
    </div>
  );
};

export default Board;
