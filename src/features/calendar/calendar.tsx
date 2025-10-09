import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { getWeekNumber } from "@/features/calendar/helper/get-week-number"
import { useGetCalendar } from "@/features/calendar/hooks/use-get-calendar"
import { CalEvent } from "@/features/calendar/types"
import { WeekdayOverview } from "@/features/calendar/weekday-overview"
import { usePageBasedScrolling } from "@/hooks/use-page-based-scrolling"
import { useRouteCycler } from "@/hooks/use-route-cycler"
import * as React from "react"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"

// Helper: Convert Sunday (0) to 7 for easier handling
const normalizeDay = (date: Date): number => {
	const day = date.getDay()
	return day === 0 ? 7 : day
}

// Helper: Calculate the number of days between two dates
const getDaysBetween = (startDate: Date, endDate: Date): number => {
	return Math.floor(
		(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
	)
}

// Helper: Add event to the accumulator structure
const addEventToDay = (
	acc: Record<number, Record<number, CalEvent[]>>,
	weekNumber: number,
	day: number,
	event: CalEvent,
): void => {
	if (!acc[weekNumber]) {
		acc[weekNumber] = {}
	}
	if (!acc[weekNumber][day]) {
		acc[weekNumber][day] = []
	}
	acc[weekNumber][day].push(event)
}

// Helper: Sort events by start time
const sortEventsByStartTime = (events: CalEvent[]): CalEvent[] => {
	return events.sort(
		(a, b) =>
			new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
	)
}

// Helper: Process multi-day events
const processMultiDayEvent = (
	acc: Record<number, Record<number, CalEvent[]>>,
	event: CalEvent,
	startDate: Date,
	endDate: Date,
): void => {
	const dayDifference = getDaysBetween(startDate, endDate)

	for (let i = 1; i <= dayDifference; i++) {
		const _startDate = new Date(startDate)
		_startDate.setDate(startDate.getDate() + i)

		const _endDate = new Date(endDate)
		_endDate.setDate(endDate.getDate() + i)

		const day = normalizeDay(_startDate)
		const [, weekNumber] = getWeekNumber(_startDate)

		const eventForDay: CalEvent = {
			...event,
			startDate: _startDate,
			endDate: _endDate,
		}

		addEventToDay(acc, weekNumber, day, eventForDay)
	}
}

// Helper: Map events to week/day structure
const mapEventsToWeekdays = (
	events: CalEvent[],
): Record<number, Record<number, CalEvent[]>> => {
	const acc: Record<number, Record<number, CalEvent[]>> = {}

	for (const event of events) {
		const startDate = new Date(event.startDate)
		const endDate = new Date(event.endDate)

		const day = normalizeDay(startDate)
		const [, weekNumber] = getWeekNumber(startDate)

		// Add event to its start day
		addEventToDay(acc, weekNumber, day, event)

		// Handle multi-day events
		const dayDifference = getDaysBetween(startDate, endDate)
		if (dayDifference > 0) {
			processMultiDayEvent(acc, event, startDate, endDate)
		}
	}

	// Sort all event arrays by start time
	for (const week of Object.values(acc)) {
		for (const day in week) {
			week[day] = sortEventsByStartTime(week[day])
		}
	}

	return acc
}

// Custom hook for current time updates
const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return currentTime
}

// Component for displaying current time
const CurrentTime = ({ time }: { time: Date }) => (
	<h2 className="flex flex-col items-end justify-center gap-0">
		<span className="font-mono text-xl font-bold text-gray-200">
			{time.toLocaleTimeString([], { hour: "2-digit" })}
			<span className="animate-pulse">:</span>
			{time.toLocaleTimeString([], { minute: "2-digit" })}
		</span>

		<span className="text-sm text-gray-300">
			{time.toLocaleDateString([], {
				weekday: "short",
				month: "long",
				day: "numeric",
			})}
		</span>
	</h2>
)

// Component for error display
const ErrorMessage = ({ message }: { message: string }) => (
	<div className="p-6">
		<div className="rounded-lg border-2 border-red-500 bg-red-500/20 px-4 py-2 text-white">
			<p className="font-bold">{message}</p>
		</div>
	</div>
)

const getLastUpdateCheckText = (timeSinceLastUpdate: number) => {
	if (timeSinceLastUpdate < 60000) {
		return "Last checked just now"
	} else if (timeSinceLastUpdate < 3600000) {
		const minutes = Math.floor(timeSinceLastUpdate / 60000)
		return `Last checked ${minutes} minute${minutes > 1 ? "s" : ""} ago`
	} else if (timeSinceLastUpdate < 86400000) {
		const hours = Math.floor(timeSinceLastUpdate / 3600000)
		return `Last checked ${hours} hour${hours > 1 ? "s" : ""} ago`
	}

	const days = Math.floor(timeSinceLastUpdate / 86400000)
	return `Last checked ${days} day${days > 1 ? "s" : ""} ago`
}
export const Calendar = () => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [hasReachedPageEnd, setHasReachedPageEnd] = useState(false)
	const currentTime = useCurrentTime()
	const { data, isLoading, error, dataUpdatedAt } = useGetCalendar()
	const timeSinceLastUpdate = Date.now() - dataUpdatedAt

	const lastCheckText = useMemo(
		() => getLastUpdateCheckText(timeSinceLastUpdate),
		[timeSinceLastUpdate],
	)

	usePageBasedScrolling({
		active: !isLoading && !error,
		onReachedPageEnd: () => setHasReachedPageEnd(true),
	})

	useRouteCycler({ active: hasReachedPageEnd })

	const mappedEvents = useMemo(() => mapEventsToWeekdays(data), [data])

	const entries = useMemo(() => Object.entries(mappedEvents), [mappedEvents])

	// Scroll to top on mount
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0
		}
	}, [])

	return (
		<Dashboard loading={isLoading} ref={scrollRef}>
			<DashboardBody className="h-full p-0">
				<div className="sticky left-0 top-0 z-10 flex w-full flex-row items-center justify-between border-b border-gray-700 bg-gray-800 p-6">
					<h1 className="text-2xl font-bold text-gray-200">
						Calendar
					</h1>
					<CurrentTime time={currentTime} />
				</div>

				{error && <ErrorMessage message={error.message} />}

				<div className="flex grow flex-col gap-6 p-6">
					{entries.map(([week, weekData], weekIndex) =>
						Object.entries(weekData).map(
							([day, events], dayIndex) => {
								const isLastWeek =
									weekIndex === entries.length - 1
								const isLastDay =
									dayIndex ===
									Object.keys(weekData).length - 1
								const showDivider = !(isLastWeek && isLastDay)

								return (
									<Fragment key={`${week}-${day}`}>
										<WeekdayOverview
											week={parseInt(week)}
											day={parseInt(day)}
											events={events}
										/>
										{showDivider && (
											<div className="border-b border-gray-700" />
										)}
									</Fragment>
								)
							},
						),
					)}

					{entries.length === 0 && !isLoading && !error && (
						<div className="flex h-fit w-full flex-col items-center justify-center gap-2 text-center text-gray-400">
							No upcoming events found.
							<br />
							<span className={"italic"}>({lastCheckText})</span>
						</div>
					)}
				</div>
			</DashboardBody>
		</Dashboard>
	)
}
