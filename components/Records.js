import React from "react";

import Podium from "./Podium";

// type Props = {
//   records: number[];
//   clearRecords: () => void;
//   language: string;
// };

const Records = (props) => {
  
  let lang;
  switch (props.language) {
    case "en":
      lang = "hard english";
      break;
    case "es":
      lang = "hard spanish";
      break;
    case "fr":
      lang = "hard french";
      break;
    default:
      lang = "english";
      break;
  }
  let userRecords;
  if (props.records.length === 0) {
    userRecords = (
      <span className="text-sm text-gray-900 text-center">
        You have no records yet.
      </span>
    );
  } else {
    let firstRecord, secondRecord, thirdRecord;
    firstRecord = secondRecord = thirdRecord = <></>;

    const maxRecord = props.records[0];
    const midRecord = props.records[1];
    const maxHeight = 96;

    props.records.forEach((record, index) => {
      switch (index) {
        case 0:
          firstRecord = (
            <Podium record={record} height={maxHeight} color="bg-indigo-400" />
          );
          break;
        case 1:
          secondRecord = (
            <Podium
              record={record}
              height={
                record === maxRecord
                  ? maxHeight
                  : ((record * 0.9) / maxRecord) * maxHeight
              }
              color="bg-indigo-300"
            />
          );
          break;
        case 2:
          const param = record === midRecord ? 0.9 : 0.8;
          thirdRecord = (
            <Podium
              record={record}
              height={
                record === maxRecord
                  ? maxHeight
                  : ((record * param) / maxRecord) * maxHeight
              }
              color="bg-indigo-200"
            />
          );
          break;
      }
    });
    userRecords = (
      <div className="flex flex-row items-end justify-center">
        {secondRecord}
        {firstRecord}
        {thirdRecord}
      </div>
    );
  }

  return (
    <div className="mx-auto w-56 lg:w-64">
      <div className="p-4 mt-8 lg:mt-16 bg-white border border-indigo-300 border-solid rounded-lg text-center">
        <h1 className="font-semibold text-gray-900 mb-2 text-center">
          Your {lang} records
        </h1>
        {props.records && userRecords}
      </div>
      {props.records.length > 0 && (
        <div
          className="text-xs text-center py-1 px-2 bg-red-100 mt-2 w-24 mx-auto text-red-800 font-medium rounded-lg hover:bg-red-200 cursor-pointer"
          onClick={props.clearRecords}
        >
          Clear records
        </div>
      )}
    </div>
  );
};

export default Records;
