import { Calendar } from "@/features/calendar/calendar"
import { Home } from "@/features/home/home"
import { Todoist } from "@/features/todoist/todoist"
import * as React from "react"
import { createBrowserRouter, RouteObject } from "react-router-dom"

const routes: RouteObject[] = [{ path: "/", element: <Home />, index: true }]

if (process.env.REACT_APP_TODOIST_API_KEY) {
	routes.push({ path: "/todoist", element: <Todoist /> })
}

if (process.env.REACT_APP_CALENDAR_WEBCAL_URLS) {
	routes.push({ path: "/calendar", element: <Calendar /> })
}

export const router = createBrowserRouter(routes)

export const routePaths = routes.map((route) => route.path as string)
