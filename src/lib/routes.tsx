import { Calendar } from "@/features/calendar/calendar"
import { Home } from "@/features/home/home"
import { Todoist } from "@/features/todoist/todoist"
import { DISABLE_HOME_PAGE } from "@/lib/constants"
import * as React from "react"
import { FC, useEffect } from "react"
import { createBrowserRouter, RouteObject, useNavigate } from "react-router-dom"

const routes: RouteObject[] = []

const RedirectRoute: FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (routes.length >= 2) {
			navigate(routes[1].path as string)
		} else {
			throw new Error("No more routes defined")
		}
	}, [])

	return null
}

if (!DISABLE_HOME_PAGE) {
	routes.push({ path: "/", element: <Home />, index: true })
} else {
	routes.push({ path: "/", element: <RedirectRoute />, index: true })
}

if (process.env.REACT_APP_TODOIST_API_KEY) {
	routes.push({ path: "/todoist", element: <Todoist /> })
}

if (process.env.REACT_APP_CALENDAR_WEBCAL_URLS) {
	routes.push({ path: "/calendar", element: <Calendar /> })
}

export const router = createBrowserRouter(routes)

export const routePaths = routes.map((route) => route.path as string)
