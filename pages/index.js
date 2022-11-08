import React, { useEffect, useState, useMemo, useRef } from "react";
import LanguageSelector from "../components/LanguageSelector";
import Heading from "../components/Heading";
import WordContainer from "../components/WordContainer";
import Input from "../components/Input";
import Result from "../components/Result";
import Timer from "../components/Timer";
import RestartButton from "../components/RestartButton";
import Records from "../components/Records";
import { shuffleWord } from "../utils/shuffleWord";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const IndexPage = () => {
  const [words, setWords] = useState([""]);
  const [wordInput, setWordInput] = useState("");
  const [language, setLanguage] = useState("easy_en");
  const [isInputCorrect, setIsInputCorrect] = useState(true);
  const [correctKeystroke, setCorrectKeystroke] = useState(0);
  const [wrongKeystroke, setWrongKeystroke] = useState(0);
  const [correction, setCorrection] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [records, setRecords] = useState([]);
  const [timer, setTimer] = useState(60);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const numberOfWords = useMemo(() => 200, []);
  const currentWord = useMemo(() => words[0], [words]);
  const totalKeyStrokes = useMemo(
    () => correctKeystroke + wrongKeystroke,
    [correctKeystroke, wrongKeystroke]
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    setWords(shuffleWord(numberOfWords, language));
    const userRecords = localStorage.getItem(language.concat("_records"));
    const records = userRecords ? JSON.parse(userRecords) : [];
    setRecords(records);
  }, [numberOfWords, language]);

  useEffect(() => {
    if (timer === 0) {
      const userRecords = localStorage.getItem(language.concat("_records"));
      let records = userRecords ? JSON.parse(userRecords) : [];
      const userResult = Math.round(correctKeystroke / 5);
      if (userResult > 0) {
        let newRecords = records.concat(userResult);
        newRecords.sort((a, b) => b - a);

        if (newRecords.length > 3) {
          newRecords = newRecords.slice(0, -1);
        }

        localStorage.setItem(
          language.concat("_records"),
          JSON.stringify(newRecords)
        );
        setRecords(newRecords);
      }
    }
  }, [timer, correctKeystroke, language]);

  const languageHandler = (newLanguage) => {
    setLanguage(newLanguage);
  };
  const timerHandler = () => {
    let timesLeft = timer;
    intervalRef.current = setInterval(() => {
      timesLeft -= 1;
      setTimer((prevTimer) => prevTimer - 1);

      if (timesLeft <= 0) {
        clearInterval(intervalRef.current);
        setIsTimerStarted(false);
      }
    }, 1000);
  };
  const inputHandler = (inputText) => {
    console.log("Helloo", inputText);
    setWordInput(inputText?.value);

    if (inputText?.value?.endsWith(" ")) {
      setWordInput("");
    }

    if (inputText?.value?.trim().length > 0) {
      //in if check the inputtext should be trimmed since when checking happens, it might contains space at the end
      if (
        currentWord &&
        inputText?.value.trim() !==
          currentWord?.slice(0, inputText?.value.length)
      ) {
        setIsInputCorrect(false);
      } else {
        setIsInputCorrect(true);
      }

      if (inputText?.value?.endsWith(" ")) {
        const inputWord = inputText?.value?.slice(0, -1);
        if (inputWord === currentWord) {
          setCorrectWords((prev) => prev + 1);
        } else {
          setWrongWords((prev) => prev + 1);
        }

        setWords((prevWords) => prevWords.slice(1));
      }
    }
  };

  const keyUpHandler = (key) => {
    if (key?.value?.length === 1 && key?.value !== " ") {
      if (totalKeyStrokes === 0) {
        //start timer when user first enter key
        setIsTimerStarted(true);
        timerHandler();
      }

      if (isInputCorrect) {
        setCorrectKeystroke((prev) => prev + 1);
      } else {
        setWrongKeystroke((prev) => prev + 1);
      }
    }

    if (key?.value === "Backspace") {
      setCorrection((prev) => prev + 1);
    }
  };

  const restartHandler = () => {
    clearInterval(intervalRef.current);
    setWords(shuffleWord(numberOfWords, language));
    setWordInput("");
    setIsInputCorrect(true);
    setCorrectKeystroke(0);
    setWrongKeystroke(0);
    setCorrection(0);

    setCorrectWords(0);
    setWrongWords(0);
    setTimer(60);
    setIsTimerStarted(false);
  };

  const clearRecords = () => {
    const bestRecords = localStorage.getItem(language.concat("_records"));
    if (bestRecords) {
      localStorage.removeItem(language.concat("_records"));
      setRecords([]);
    }
  };
  
  return (
    <>
      <div className="font-inter p-8 md:p-14 lg:p-16">
        <div className="lg:flex justify-around">
          <div className="flex-none">
            <Heading />
            <div className="md:max-w-4xl lg:max-w-2xl xl:max-w-3xl lg:mr-8">
              <WordContainer
                words={words}
                isInputCorrect={isInputCorrect || wordInput.length === 0}
              />
              <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center mt-6 md:mt-8">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Type"
                    variant="outlined"
                    value={wordInput}
                    disabled={timer === 0}
                    onChange={(e) => {
                      inputHandler(e?.target);
                    }}
                    onKeyUp={(e) => {
                      keyUpHandler(e?.target);
                    }}
                  />
                </Box>
                {/* <input
                  value={wordInput}
                  disabled={timer === 0}
                  onChange={(e) => {
                    inputHandler(e?.target);
                  }}
                  onKeyUp={(e) => {
                    keyUpHandler(e?.target);
                  }}
                /> */}
                <div className="flex-0 flex my-5 lg:my-0">
                  <Timer timer={timer} />
                  <RestartButton
                    onClick={() => {
                      restartHandler();
                    }}
                  />
                </div>
                {/* <LanguageSelector
                  disabled={isTimerStarted}
                  language={language}
                  onChange={()=>{languageHandler()}}
                /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col justify-around lg:mx-24">
            <Result
              wpm={Math.round(correctKeystroke)}
              correctKeystroke={correctKeystroke}
              wrongKeystroke={wrongKeystroke}
              accuracy={(
                (correctKeystroke * 100) /
                (totalKeyStrokes + correction)
              ).toFixed(2)}
              correctWords={correctWords}
              wrongWords={wrongWords}
            />
            {/* <Records
              records={records}
              clearRecords={clearRecords}
              language={language}
            /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndexPage;
