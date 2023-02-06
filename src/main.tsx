import React from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider, CssBaseline } from "@mui/material"

import theme from "theme"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
)

postMessage({ payload: "removeLoading" }, "*")
