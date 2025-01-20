import { CalEvent } from "@/components/calendar/types"
import { WeekdayOverview } from "@/components/calendar/weekday-overview"
import * as React from "react"
import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetCalendar } from "@/components/calendar/hooks/use-get-calendar"

export const Calendar = () => {
	const { data, isLoading, error } = useGetCalendar()
	const currentDay = new Date().getDay()

	const mappedEventsToWeekDays = data?.reduce(
		(acc, event) => {
			const day = new Date(event.startDate).getDay()

			// Skip events that have already passed
			if (day < currentDay) {
				return acc
			}

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
		<Dashboard loading={isLoading && !error}>
			<DashboardBody>
				<h1 className="mb-4 text-2xl font-bold text-gray-200">
					Calendar
				</h1>

				{error && (
					<div className={"bg-red-500/20 border-2 border-red-500 text-white px-4 py-2 rounded-lg"}>
						<p className={"font-bold"}>{ error.message }</p>
					</div>
				)}

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
