import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const WordContainer = (props) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
  }));

  const lightTheme = createTheme({ palette: { mode: "light" } });
  return (
    <>
      <Grid container spacing={2}>
        {[lightTheme].map((theme, index) => (
          <Grid item xs={6} key={index}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  // p: 2,
                  bgcolor: "background.default",
                  display: "grid",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Item
                  key={24}
                  elevation={24}
                  style={{ width: "880px", height: "180px" }}
                >
                  <div className="max-h-40 overflow-hidden px-3 pb-3 lg:p-4 leading-9  ">
                    <span
                      className={`font-medium text-2xl md:text-3xl lg:text-3xl ${
                        props.isInputCorrect ? "bg-indigo-300" : "bg-red-500"
                      } rounded-md text-gray-900 px-1`}
                    >
                      {props.words ? props.words[0] : " "}
                    </span>
                    {props.words
                      ? props.words.slice(1).map((word, index) => (
                          <span
                            className="font-medium text-1xl md:text-3xl lg:text-2xl text-gray-900 px-1"
                            key={index}
                          >
                            {word}{" "}
                          </span>
                        ))
                      : "ere"}
                  </div>
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>{" "}
      {/* <div className="max-h-36 overflow-hidden border-indigo-300 border-4 p-3 lg:p-4 leading-9  ">
        <span
          className={`font-medium text-2xl md:text-3xl lg:text-3xl ${
            props.isInputCorrect ? "bg-indigo-300" : "bg-red-500"
          } rounded-md text-gray-900 px-1`}
        >
          {props.words ? props.words[0] : " "}
        </span>
        {props.words
          ? props.words.slice(1).map((word, index) => (
              <span
                className="font-medium text-1xl md:text-3xl lg:text-2xl text-gray-900 px-1"
                key={index}
              >
                {word}{" "}
              </span>
            ))
          : "ere"}
      </div> */}
    </>
  );
};

export default WordContainer;
