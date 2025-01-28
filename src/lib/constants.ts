export const IS_DEV = process.env.NODE_ENV === "development"

export const API_URL = `http://localhost:${process.env.REACT_APP_API_PORT || 3001}`

export const TODOIST_API_KEY = process.env.REACT_APP_TODOIST_API_KEY || ""

export const CALENDAR_WEBCAL_URLS =
	process.env.REACT_APP_CALENDAR_WEBCAL_URLS || ""

export const CALENDAR_WEBCAL_COLORS = (
	process.env.REACT_APP_CALENDAR_WEBCAL_COLORS || ""
).split(",")

export const CALENDAR_WEBCAL_NAMES = (
	process.env.REACT_APP_CALENDAR_WEBCAL_NAMES || ""
).split(",")
