export const TODOIST_API_KEY = process.env.REACT_APP_TODOIST_API_KEY || ""

export const CALENDAR_WEBCAL_URLS = (process.env.REACT_APP_CALENDAR_WEBCAL_URLS || "").split(",").map((url) => url.trim())