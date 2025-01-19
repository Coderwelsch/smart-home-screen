import { EventEntry } from "@/components/calendar/event-entry"
import { CalEvent } from "@/components/calendar/types"
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

	return (
		<div
			key={day}
			className={classNames(
				"flex flex-col gap-4",
				!isToday && !isTomorrow && "opacity-25",
			)}
		>
			<h2 className={"text-lg font-bold text-gray-200"}>{weekDay}</h2>

			{events.map((event) => (
				<EventEntry
					key={event.summary}
					summary={event.summary}
					startDate={new Date(event.startDate)}
					endDate={new Date(event.endDate)}
					notes={event.notes}
				/>
			))}
		</div>
	)
}
