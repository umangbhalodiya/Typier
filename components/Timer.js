import React from "react";

// type Props = {
//   timer: number;
// };

const Timer = (props) =>{ return(
  <div className="flex-none p-3 md:text-lg w-16 bg-gray-100 text-indigo-700 font-medium ml-2 md:ml-3 rounded-lg">
    <span>
      {Math.floor(props.timer / 60)}:
      {(props.timer % 60).toString().padStart(2, "0")}
    </span>
  </div>
);
}

export default Timer;
