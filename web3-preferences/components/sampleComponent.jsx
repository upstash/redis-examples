
import React from "react";
import { useState} from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange, grey } from '@mui/material/colors'

const lightTheme = createTheme({
  palette: {
    primary: {
      main: grey[400],
    },
  }
})

const darkTheme = createTheme({
  palette: {
    primary: {
      main: orange[400],
    },
  }
})

export default function Showcase(parameters) {

  const userSettings = parameters.userSettings
  const [theme, setTheme] = useState("light")
  const [greetingMessage, setGreetingMessage] = useState("Anonymous Person")

  const items = []
  if (userSettings) {

    const obj = userSettings[0]

    for (const key in userSettings) {
      items.push(<li key={key}> {key}: {userSettings[key]} </li>)
    }

    if (userSettings["themePreference"] != theme) {
      setTheme(userSettings["themePreference"] == "light" ? "light" : "dark")
    }

    if (!greetingMessage || userSettings["greetingMessage"] != greetingMessage) {
      if (userSettings["greetingMessage"]) {
        setGreetingMessage(userSettings["greetingMessage"])
      }
      else {
        setGreetingMessage("patladi")
      }
    }
  }

  return (
    <div>
      <div style={{
        padding: 10,
        margin: 10,
        backgroundColor: theme == "light" ? "grey" : "orange",
        border: "solid",
        borderWidth: "30px",
        borderColor: theme == "light" ? "#B2B2B2" : "black"
      }}>
        <ThemeProvider
          theme={theme == "light" ? lightTheme : darkTheme}
        >

          <h2>Hi, {greetingMessage}!</h2>
          <p>User and their preferences:</p>
          {items}

        </ThemeProvider>

      </div>
    </div>
  );
}




