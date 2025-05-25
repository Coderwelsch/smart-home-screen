import { parse } from "./parse"

export interface CalendarEvent {
	summary: string
	startDate: Date
	endDate: Date
	allDay?: boolean
	notes?: string
	calendar?: string
}

export const getLatestCalendarData = async (): Promise<CalendarEvent[]> => {
	const urls = process.env.REACT_APP_CALENDAR_WEBCAL_URLS || ""

	const webcalNames = (
		process.env.REACT_APP_CALENDAR_WEBCAL_NAMES || ""
	).split(",")

	const webcalUrls = urls.split(",").map((url) => {
		if (url.startsWith("webcal")) {
			return url.replace("webcal", "https")
		}

		return url
	})

	const parsedData = await Promise.all(
		webcalUrls.map(async (url, index) => {
			const response = await fetch(url)
			const data = await response.text()
			const calName = webcalNames[index] || "Unknown"

			return parse(data).map((event) => {
				const isAllDay =
					event.startDate.getHours() === 0 &&
					event.endDate.getHours() === 0

				return {
					...event,
					allDay: isAllDay,
					calendar: calName,
				}
			})
		}),
	).then((data) => data.flat())

	const yesterday = new Date().setDate(new Date().getDate() - 1)
	const today = new Date().setHours(0, 0, 0, 0)
	const nextWeek = new Date().setDate(new Date().getDate() + 7)

	const filtered = parsedData.filter((event) => {
		const eventStart = event.startDate.getTime()
		const eventEnd = event.endDate.getTime()

		return (
			(!yesterday || eventStart >= yesterday) &&
			(!nextWeek || eventEnd <= nextWeek)
		)
	})

	if (filtered.length < 7) {
		const moreData = parsedData
			.filter((event) => {
				const eventStart = event.startDate.getTime()

				return eventStart >= today
			})
			.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

		return moreData
	}

	return filtered.sort(
		(a, b) => a.startDate.getTime() - b.startDate.getTime(),
	)
}
