import { ReactNode } from "react"

interface EventEntryProps {
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

	const isRunning = startDate < new Date() && endDate > new Date()

	return (
		<div
			className={
				"flex flex-col gap-0 rounded-lg border border-neutral-300 px-4 py-2"
			}
		>
			<h3 className={"text-md font-bold text-gray-200"}>{summary}</h3>

			<div className={"text-sm text-gray-400"}>
				{startTime} – {endTime}
			</div>

			{children}
		</div>
	)
}
