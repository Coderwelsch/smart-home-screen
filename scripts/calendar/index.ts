import { parse } from "./parse"

export const getLatestCalendarData = async () => {
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

			return parse(data).map((event) => ({
				...event,
				calendar: calName,
			}))
		}),
	).then((data) => data.flat())

	const yesterday = new Date().setDate(new Date().getDate() - 1)
	const nextWeek = new Date().setDate(new Date().getDate() + 7)

	const filtered = parsedData.filter((event) => {
		const eventStart = event.startDate.getTime()
		const eventEnd = event.endDate.getTime()

		return (
			(!yesterday || eventStart >= yesterday) &&
			(!nextWeek || eventEnd <= nextWeek)
		)
	})

	return filtered.sort(
		(a, b) => a.startDate.getTime() - b.startDate.getTime(),
	)
}
