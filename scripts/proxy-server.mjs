import http from "http"
import ical from "ical.js"
import path from "node:path"
import url from "url"
import dotenv from "dotenv"
import { URL } from "node:url" // in Browser, the URL in native accessible on window

const __dirname = new URL(".", import.meta.url).pathname

dotenv.config({ path: path.resolve(__dirname, "../.env") })

// eslint-disable-next-line no-undef
const PORT = process.env.REACT_APP_PROXY_SERVER_PORT || 3001
// eslint-disable-next-line no-undef

const parseCalData = (calData) => {
	const jcalData = ical.parse(calData)
	const comp = new ical.Component(jcalData)
	const vevents = comp.getAllSubcomponents("vevent")

	const recurringEvents = vevents.reduce((acc, vevent) => {
		const event = new ical.Event(vevent)

		if (!event.isRecurring()) {
			return acc
		}

		const rrule = event.component.getFirstPropertyValue("rrule")

		if (rrule) {
			const recur = new ical.Recur(rrule)

			const now = ical.Time.now()
			const inSevenDays = ical.Time.fromData({
				year: now.year,
				month: now.month,
				day: now.day + 7,
			})
			const recurEvent = recur.getNextOccurrence(now, inSevenDays)

			if (!recurEvent) {
				return acc
			}

			const endTime = new Date(
				recurEvent.toJSDate() + event.duration.toSeconds() * 1000,
			)

			console.log("recurEvent end time", event.summary, event.startDate.toJSDate())
			process.exit(0)

			acc.push({
				summary: event.summary,
				startDate: recurEvent.toJSDate(),
				endDate: new Date(endTime),
			})
		}

		return acc
	}, [])

	console.log("events", recurringEvents)

	const mappedNormalEvents = vevents.map((vevent) => {
		const event = new ical.Event(vevent)

		return {
			summary: event.summary,
			startDate: event.startDate.toJSDate(),
			endDate: event.endDate.toJSDate(),
		}
	})

	const sortedEvents = [...recurringEvents, ...mappedNormalEvents].sort(
		(a, b) => a.startDate - b.startDate,
	)

	return sortedEvents
}

const getLatestCalendarData = async () => {
	// eslint-disable-next-line no-undef
	const calData = await fetch(process.env.REACT_APP_CALENDAR_WEBCAL_URL).then(
		(res) => res.text(),
	)

	const parsedData = parseCalData(calData)

	// one day before today
	const yesterday = new Date().setDate(new Date().getDate() - 1)
	const nextWeek = new Date().setDate(new Date().getDate() + 7)

	return parsedData
		.filter((event) => {
			const eventStart = event.startDate
			const eventEnd = event.endDate

			return (
				(!yesterday || eventStart >= yesterday) &&
				(!nextWeek || eventEnd <= nextWeek)
			)
		})
		.sort((a, b) => a.startDate - b.startDate)
}

const requestHandler = (req, res) => {
	const { pathname } = url.parse(req.url)

	if (pathname === "/calendar") {
		getLatestCalendarData().then((data) => {
			res.setHeader("Content-Type", "application/json")
			res.setHeader("Access-Control-Allow-Origin", "*")

			res.end(JSON.stringify(data))
		})
	} else {
		res.statusCode = 404
		res.end("Not Found")
	}
}

const server = http.createServer(requestHandler)

server.listen(PORT, () => {
	console.log(`Proxy server is running on http://localhost:${PORT}`)
})

getLatestCalendarData()
