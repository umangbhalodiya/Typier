import React from "react";

const Result = (props) => {
  return (
    <>
      <div className="calc-container">
        <div className="calc-justifier">
          <div className="calc-items">
            <div className="calc-section">
              <div className="calc-wpm"> {props.wpm} WPM</div>
              <div> (words per minute)</div>
              <div> 5 correct keystrokes = 1 WPM</div>
            </div>
            <div className="calc-item">
              <div>Accuracy</div>
              <div>
                {" "}
                {isNaN(parseInt(props.accuracy)) ? 0 : props.accuracy}%
              </div>
            </div>
            <div className="calc-item">
              <div>Correct words</div>
              <div> {props.correctWords}</div>
            </div>
            <div className="calc-item">
              <div>Wrong words</div>
              <div> {props.wrongWords}</div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Result;
