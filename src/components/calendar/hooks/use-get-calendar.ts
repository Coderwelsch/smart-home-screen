import { useQuery } from "@tanstack/react-query"
import { CALENDAR_WEBCAL_URLS, PROXY_SERVER_URL } from "@/lib/constants"
import ical from "ical.js"

interface UseGetCalendarProps {
	startDate?: Date
	endDate?: Date
}

export const useGetCalendar = ({ startDate, endDate }: UseGetCalendarProps) => {
	return useQuery({
		queryKey: ["calendar", startDate, endDate],
		queryFn: async () => {
			const urls = CALENDAR_WEBCAL_URLS

			const responses = await Promise.all(urls.map((url) => fetch(`${PROXY_SERVER_URL}/${url}`)))

			const texts = await Promise.all(responses.map((response) => response.text()))

			const events = texts.flatMap((text) => {
				const jcalData = ical.parse(text)
				const comp = new ical.Component(jcalData)
				const vevents = comp.getAllSubcomponents("vevent")

				return vevents.map((vevent) => {
					const event = new ical.Event(vevent)
					return {
						summary: event.summary,
						startDate: event.startDate.toJSDate(),
						endDate: event.endDate.toJSDate(),
					}
				})
			})

			if (startDate || endDate) {
				return events.filter((event) => {
					const eventStart = event.startDate
					const eventEnd = event.endDate

					return (!startDate || eventStart >= startDate) && (!endDate || eventEnd <= endDate)
				})
			}

			return events
		},
	})
}