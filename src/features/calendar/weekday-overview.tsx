import { EventEntry } from "@/features/calendar/event-entry"
import { getWeekNumber } from "@/features/calendar/helper/get-week-number"
import { CalEvent } from "@/features/calendar/types"
import { classNames } from "@/lib"
import * as React from "react"

interface WeekdayOverviewProps {
	day: number
	week: number
	events: CalEvent[]
}

export const WeekdayOverview = ({
	day,
	week,
	events,
}: WeekdayOverviewProps) => {
	const weekDay = new Date(events[0].startDate).toLocaleString("en-GB", {
		weekday: "long",
	})

	const isThisWeek = getWeekNumber(new Date())[1] === week
	const isNextWeek = getWeekNumber(new Date())[1] + 1 === week
	const isToday = new Date().getDay() === day && isThisWeek
	const isTomorrow = new Date().getDay() + 1 === day && isThisWeek

	const sortedEvents = events.sort((a, b) => {
		// sort past events to the bottom otherwise sort by start date
		if (
			new Date(a.endDate) < new Date() &&
			new Date(b.endDate) > new Date()
		) {
			return 1
		}

		return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
	})

	return (
		<div key={day} className={classNames("flex flex-col gap-4")}>
			<h2 className={"text-sm font-bold text-gray-400"}>
				{isToday ? "Today" : null}

				{isTomorrow ? "Tomorrow" : null}

				{!isToday && !isTomorrow && isThisWeek ? `${weekDay}` : null}

				{isNextWeek ? `${weekDay} (next week)` : null}
			</h2>

			{sortedEvents.map((event, index) => (
				<EventEntry
					key={index}
					summary={event.summary}
					startDate={new Date(event.startDate)}
					endDate={new Date(event.endDate)}
					allDay={event.allDay}
					notes={event.notes}
					calendar={event.calendar}
				/>
			))}
		</div>
	)
}
