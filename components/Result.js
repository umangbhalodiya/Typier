import React from "react";

// interface Props {
//   wpm: number;
//   correctKeystroke: number;
//   wrongKeystroke: number;
//   accuracy: string;
//   correctWords: number;
//   wrongWords: number;
// }

const Result = (props) => {
  return (
    <div className="mx-auto lg:mx-0 mt-8 lg:mt-0 w-56 lg:w-64 rounded-lg bg-white border border-solid border-gray-200">
      <div className="rounded-t-lg py-5 bg-indigo-600 border-b border-solid border-indigo-200">
        <p className="text-center text-4xl font-bold text-white">
          {props.wpm} WPM
        </p>
        <p className="text-xs text-indigo-100 text-center">
          (words per minute)
        </p>
        <p className="text-xs text-indigo-50 text-center">
          5 correct keystrokes = 1 WPM
        </p>
      </div>
      {/* <div className="bg-indigo-50 flex justify-between text-center">
        <span className="ml-2">Keystrokes </span>
        <span className="mr-4">
          (<span className="text-indigo-600">{props.correctKeystroke}</span> |{" "}
          <span className="text-red-400">{props.wrongKeystroke}</span>){" "}
          <span className="font-bold">
            {props.correctKeystroke + props.wrongKeystroke}
          </span>
        </span>
      </div> */}
      <div className="flex justify-between">
        <span className="ml-2">Accuracy </span>
        <span className="font-bold text-center mr-4">
          {isNaN(parseInt(props.accuracy)) ? 0 : props.accuracy}%
        </span>
      </div>
      <div className="flex justify-between bg-indigo-50">
        <span className="ml-2">Correct words </span>
        <span className="font-bold text-indigo-600 mr-4">
          {props.correctWords}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="ml-2">Wrong words </span>
        <span className="font-bold text-red-400 mr-4">{props.wrongWords}</span>
      </div>
    </div>
  );
};

export default Result;
