import { CalEvent } from "@/components/calendar/types"
import { classNames } from "@/lib"
import { ReactNode } from "react"

interface EventEntryProps extends CalEvent {
	summary: string
	startDate: Date
	endDate: Date
	children?: ReactNode
}

export const EventEntry = ({
	children,
	endDate,
	startDate,
	summary,
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

	const isToday = startDate.toDateString() === new Date().toDateString()
	const timeToStart = startDate.getTime() - new Date().getTime()
	const isRunning = startDate < new Date() && endDate > new Date()

	return (
		<div
			className={classNames(
				"flex flex-col gap-2 rounded-lg border border-neutral-300 px-4 py-4",
				isRunning && "border-red-500 bg-red-500/10",
			)}
		>
			{isToday && (
				<div
					className={
						"flex flex-row items-center gap-2 text-sm text-gray-200"
					}
				>
					{isRunning ? (
						<div className={"flex flex-row items-center gap-2"}>
							<div className={"h-2 w-2 rounded-full bg-red-500"}>
								<div className="h-2 w-2 scale-125 animate-ping rounded-full bg-red-500" />
							</div>

							<span className={"text-red-50"}>Now running</span>
						</div>
					) : null}

					{timeToStart > 0 && (
						<span>
							in {Math.round(timeToStart / 1000 / 60)} minutes
						</span>
					)}
				</div>
			)}

			<div className={"flex flex-col gap-0"}>
				<h3 className={"text-md font-bold text-gray-200"}>{summary}</h3>

				<div className={"text-sm text-gray-200"}>
					{startTime !== endTime ? (
						<>
							{startTime} – {endTime}
						</>
					) : (
						startTime
					)}
				</div>
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
		</div>
	)
}
