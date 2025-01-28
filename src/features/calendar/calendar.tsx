import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetCalendar } from "@/features/calendar/hooks/use-get-calendar"
import { CalEvent } from "@/features/calendar/types"
import { WeekdayOverview } from "@/features/calendar/weekday-overview"
import { usePageBasedScrolling } from "@/hooks/use-page-based-scrolling"
import * as React from "react"
import { useEffect, useRef, useState } from "react"

export const Calendar = () => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [hasReachedPageEnd, setHasReachedPageEnd] = useState(false)

	const { data, isLoading, error } = useGetCalendar()
	const currentDay = new Date().getDay()

	usePageBasedScrolling({
		active: !isLoading && !error,
		onReachedPageEnd: () => setHasReachedPageEnd(true),
	})

	// useRouteCycler({ active: hasReachedPageEnd }) // Change route every 5 seconds

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

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0
		}
	}, [])

	return (
		<Dashboard loading={isLoading && !error} ref={scrollRef}>
			<DashboardBody>
				<h1 className="mb-4 text-2xl font-bold text-gray-200">
					Calendar
				</h1>

				{error && (
					<div
						className={
							"rounded-lg border-2 border-red-500 bg-red-500/20 px-4 py-2 text-white"
						}
					>
						<p className={"font-bold"}>{error.message}</p>
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
