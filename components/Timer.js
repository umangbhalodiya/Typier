import React from "react";

const Timer = (props) => {
  return (
    <div className="timer-calc">
      <span>
        {Math.floor(props.timer / 60)}:
        {(props.timer % 60).toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
