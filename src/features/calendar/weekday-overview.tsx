import { EventEntry } from "@/features/calendar/event-entry"
import { CalEvent } from "@/features/calendar/types"
import { classNames } from "@/lib"
import * as React from "react"

interface WeekdayOverviewProps {
	day: number
	events: CalEvent[]
}

export const WeekdayOverview = ({ day, events }: WeekdayOverviewProps) => {
	const weekDay = new Date(events[0].startDate).toLocaleString("en-US", {
		weekday: "long",
	})

	const isToday = new Date().getDay() === day
	const isTomorrow = new Date().getDay() + 1 === day

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
		<div
			key={day}
			className={classNames(
				"flex flex-col gap-4",
				// !isToday && !isTomorrow && "opacity-25",
			)}
		>
			<h2 className={"text-sm font-bold text-gray-400"}>
				{isToday ? "Today" : isTomorrow ? "Tomorrow" : weekDay}
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
