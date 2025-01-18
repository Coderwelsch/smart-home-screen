import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"

import "./index.css"
import { QueryProvider } from "./lib/query-provider"
import { Home } from "./pages"
import { Calendar } from "./pages/calendar"
import { Todoist } from "./components/todoist/todoist"
import reportWebVitals from "./reportWebVitals"


const routes: RouteObject[] = [
	{ path: "/", element: <Home />, index: true }
]

if (process.env.REACT_APP_TODOIST_API_KEY) {
	routes.push({ path: "/todoist", element: <Todoist /> })
}

if (process.env.REACT_APP_CALENDAR_WEBCAL_URLS) {
	routes.push({ path: "/calendar", element: <Calendar /> })
}



const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
	<React.StrictMode>
		<main>
			<QueryProvider>
				<RouterProvider router={ router } />
			</QueryProvider>
		</main>
	</React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()