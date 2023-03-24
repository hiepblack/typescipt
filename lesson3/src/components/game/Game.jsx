import React, { useEffect, useState } from "react";
import Board from "./Board";
import "./style.css";
import calculateWinner from "./hepler.js";
import Timer from "./Timer";

const Game = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [checkWinner, setCheckWinner] = useState([]);
  const [undo, setUndo] = useState([]);
  const [time, setTime] = useState(3);

  const winner = calculateWinner(cells);

  const handleClick = (index) => {
    const cellCoppy = [...cells];
    if (winner || cellCoppy[index]) {
      return;
    }
    setUndo(cells);
    cellCoppy[index] = isNext ? "X" : "O";
    setCells(cellCoppy);
    setIsNext(!isNext);
  };
  useEffect(() => {
    if(!winner){
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      if(time < 0) {
        handleClick(Math.floor(Math.random() * 9))
        setTime(3)
      }
    }else{
      setTime(0)
      return;
    }
  }, [time]);
  useEffect(() => {
    if (winner) {
      const newArr = [];
      winner.index.forEach((item) => newArr.push(item));
      setCheckWinner([...newArr]);
      return;
    }
  }, [isNext]);
  const resetGame = () => {
    setCells(Array(9).fill(null));
    setCheckWinner([]);
    setTime(3)
    setIsNext(true);
  };
  const undoGame = () => {
    setCells(undo);
    setIsNext(!isNext);
    setTime(3)
  };
  return (
    <div className="game">
      <Timer time={time} />
      <div className="winner">{winner ? `${winner.value}: đã chiến thắng` : ""}</div>
      <div className="game__box">
        <h1>Tic-Tac-Toc</h1>
        <Board
          cells={cells}
          handleClick={handleClick}
          checkWinner={checkWinner}
          winner={winner}
        />
        
        <div className="game__button">
          <button onClick={resetGame} className="btn">
            Reset
          </button>
          <button onClick={undoGame} className="btn">
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
