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
  const [check, setCheck] = useState(false);
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
    setCheck(!check);
    setTime(3);
  };
  useEffect(() => {
    let timeId;
    if (check) {
      timeId = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      console.log(time);
      if (time === 0) {
        const cellCoppy = [...cells];
        let indexrandom = Math.floor(Math.random() * 9);
        console.log(indexrandom);
        console.log(cellCoppy);
        let arr = [];
        cellCoppy.forEach((item, index) => {
          if (item || winner) {
            clearTimeout(timeId);
            console.log(index);
            return;
          } else {
            arr.push(index);
          }
        });
        if (arr.length < 1) {
          alert("hoà rồi");
          setCells(Array(9).fill(null));
          setTime(3);
          clearTimeout(timeId);
          return;
        }
        var randomIndex = Math.floor(Math.random() * arr.length);
        var randomNumber = arr[randomIndex];
        cellCoppy[randomNumber] = isNext ? "X" : "O";
        setCells(cellCoppy);
        setIsNext(!isNext);
        setCheck(false);
        setTime(3);
        clearTimeout(timeId);
      }
      if (winner) {
        clearTimeout(timeId);
      }
    }
  }, [time, check]);
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
    setIsNext(true);
    setTime(3);
    setCheck(false);
  };
  const undoGame = () => {
    setCells(undo);
    setIsNext(!isNext);
  };
  return (
    <div className="game">
      <Timer time={time} />
      <div className="winner">
        {winner ? `${winner.value}: đã chiến thắng` : ""}
      </div>
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
