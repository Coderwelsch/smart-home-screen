import { useGetCalendarMeta } from "@/components/calendar/hooks/use-get-calendar-meta"
import { CalEvent } from "@/components/calendar/types"
import { classNames } from "@/lib"
import { ReactNode } from "react"

export const eventEntryStyles = {
	red: "text-red-300 bg-red-500/10",
	blue: "text-blue-300 bg-blue-500/10",
}

interface EventEntryProps extends CalEvent {
	children?: ReactNode
}

export const EventEntry = ({
	children,
	endDate,
	startDate,
	summary,
	allDay,
	calendar,
	notes,
}: EventEntryProps) => {
	const startTime = startDate.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	})

	const endTime = endDate.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	})

	const calMetaData = useGetCalendarMeta(calendar || "")

	const themeStyles = eventEntryStyles[calMetaData.color]

	console.log("themeStyles", themeStyles, calMetaData)

	const isToday = startDate.toDateString() === new Date().toDateString()
	const timeToStart = startDate.getTime() - new Date().getTime()
	const isRunning = startDate < new Date() && endDate > new Date()

	const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" })

	return (
		<div
			className={classNames(
				"relative flex flex-col rounded-lg border border-neutral-300 px-4 py-4",
				isRunning && "border-red-500 bg-red-500/10",
				!isRunning && isToday && "border-blue-500 bg-blue-500/10",
			)}
		>
			{isToday && (
				<>
					{isRunning ? (
						<div className={"flex flex-row items-center gap-2"}>
							<div className={"h-2 w-2 rounded-full bg-red-500"}>
								<div className="h-2 w-2 scale-125 animate-ping rounded-full bg-red-500" />
							</div>

							<h4
								className={
									"font-mono font-semibold text-red-100"
								}
							>
								Now running
							</h4>
						</div>
					) : null}

					{timeToStart > 0 && (
						<h4
							className={
								"font-mono text-sm font-semibold text-blue-400"
							}
						>
							{rtf1.format(
								Math.ceil(timeToStart / 1000 / 60 / 60),
								"hour",
							)}
						</h4>
					)}
				</>
			)}

			<div className={"gap flex flex-col"}>
				<h3 className={"text-lg font-bold text-gray-200"}>{summary}</h3>

				{!allDay && (
					<div className={"font-mono text-sm text-gray-400"}>
						{startTime !== endTime ? (
							<>
								{startTime} – {endTime}
							</>
						) : (
							startTime
						)}
					</div>
				)}
			</div>

			{notes && (
				<p
					className={classNames(
						"text-md text-gray-500",
						isRunning && "text-red-50",
					)}
				>
					{notes}
				</p>
			)}

			{children}

			{calendar && (
				<div
					className={classNames(
						"absolute bottom-4 right-4 rounded-md px-1.5 py-1 font-mono text-xs",
						themeStyles,
					)}
				>
					{calendar}
				</div>
			)}
		</div>
	)
}
