import React from "react";

const Timer = ({time}) => {

  return (
    <div className="app">
      <h3>Đồng hồ đếm ngược</h3>
      <div className="container">
        <div className="adjust-buttons">
          <button>{time}</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
