export const IS_DEV = process.env.NODE_ENV === "development"

export const PROXY_SERVER_URL = `http://localhost:${process.env.REACT_APP_PROXY_SERVER_PORT || 3001}`

export const TODOIST_API_KEY = process.env.REACT_APP_TODOIST_API_KEY || ""

export const CALENDAR_WEBCAL_URL =
	process.env.REACT_APP_CALENDAR_WEBCAL_URL || ""
