import { EventEntry } from "@/components/calendar/event-entry"
import { WeekdayOverview } from "@/components/calendar/weekday-overview"
import * as React from "react"
import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetCalendar } from "@/components/calendar/hooks/use-get-calendar"

const getStartOfThisWeek = () => {
	const today = new Date()
	const dayOfWeek = today.getDay()
	const startOfThisWeek = new Date(today)

	startOfThisWeek.setDate(startOfThisWeek.getDate() - dayOfWeek)
	startOfThisWeek.setHours(0, 0, 0, 0)

	return startOfThisWeek
}

const getEndOfThisWeek = () => {
	const today = new Date()
	const dayOfWeek = today.getDay()
	const endOfThisWeek = new Date(today)

	endOfThisWeek.setDate(endOfThisWeek.getDate() + (6 - dayOfWeek))
	endOfThisWeek.setHours(23, 59, 59, 999)

	return endOfThisWeek
}

export const Calendar = () => {
	const { data, isLoading } = useGetCalendar({
		startDate: getStartOfThisWeek(),
		endDate: getEndOfThisWeek(),
	})

	const mappedEventsToWeekDays = data?.reduce(
		(acc, event) => {
			const day = event.startDate.getDay()

			if (!acc[day]) {
				acc[day] = []
			}

			acc[day].push(event)

			return acc
		},
		{} as Record<
			number,
			{
				summary: string
				startDate: Date
				endDate: Date
			}[]
		>,
	)
	const mappedEventsArray = Object.entries(mappedEventsToWeekDays || {})

	return (
		<Dashboard loading={isLoading}>
			<DashboardBody>
				<h1 className="mb-4 text-2xl font-bold text-gray-200">
					Calendar
				</h1>

				<div className={"flex flex-col gap-4"}>
					{mappedEventsArray.map(([day, events], index) => (
						<WeekdayOverview
							key={index}
							day={parseInt(day)}
							events={events}
						/>
					))}
				</div>
			</DashboardBody>
		</Dashboard>
	)
}
