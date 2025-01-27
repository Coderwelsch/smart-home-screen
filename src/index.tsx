import { IS_DEV } from "@/lib/constants"
import { router } from "@/lib/routes"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "./index.css"
import { QueryProvider } from "./lib/query-provider"
import reportWebVitals from "./reportWebVitals"

const App = () => {
	return (
		<React.StrictMode>
			<main className={IS_DEV ? "development" : undefined}>
				<QueryProvider>
					<RouterProvider router={router} />
				</QueryProvider>
			</main>
		</React.StrictMode>
	)
}

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
