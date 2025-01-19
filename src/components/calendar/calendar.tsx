import { CalEvent } from "@/components/calendar/types"
import { WeekdayOverview } from "@/components/calendar/weekday-overview"
import * as React from "react"
import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetCalendar } from "@/components/calendar/hooks/use-get-calendar"

export const Calendar = () => {
	const { data, isLoading } = useGetCalendar()

	const mappedEventsToWeekDays = data?.reduce(
		(acc, event) => {
			const day = new Date(event.startDate).getDay()

			console.log(event.summary, "map day to event", day, new Date(event.startDate))

			if (!acc[day]) {
				acc[day] = []
			}

			acc[day].push(event)

			return acc
		},
		{} as Record<number, CalEvent[]>,
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
