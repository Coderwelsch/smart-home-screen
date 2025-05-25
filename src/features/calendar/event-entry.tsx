import { useGetCalendarMeta } from "@/features/calendar/hooks/use-get-calendar-meta"
import { CalEvent } from "@/features/calendar/types"
import { classNames } from "@/lib"
import { Fragment, ReactNode } from "react"

export const eventEntryStyles = {
	red: "text-red-300 bg-red-500/10 border-red-500/40",
	orange: "text-orange-300 bg-orange-500/10 border-orange-500/40",
	amber: "text-amber-300 bg-amber-500/10 border-amber-500/40",
	yellow: "text-yellow-300 bg-yellow-500/10 border-yellow-500/40",
	lime: "text-lime-300 bg-lime-500/10 border-lime-500/40",
	green: "text-green-300 bg-green-500/10 border-green-500/40",
	emerald: "text-emerald-300 bg-emerald-500/10 border-emerald-500/40",
	teal: "text-teal-300 bg-teal-500/10 border-teal-500/40",
	cyan: "text-cyan-300 bg-cyan-500/10 border-cyan-500/40",
	sky: "text-sky-300 bg-sky-500/10 border-sky-500/40",
	blue: "text-blue-300 bg-blue-500/10 border-blue-500/40",
	indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-500/40",
	violet: "text-violet-300 bg-violet-500/10 border-violet-500/40",
	purple: "text-purple-300 bg-purple-500/10 border-purple-500/40",
	fuchsia: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/40",
	pink: "text-pink-300 bg-pink-500/10 border-pink-500/40",
	rose: "text-rose-300 bg-rose-500/10 border-rose-500/40",
	slate: "text-slate-300 bg-slate-500/10 border-slate-500/40",
	gray: "text-gray-300 bg-gray-500/10 border-gray-500/40",
	zinc: "text-zinc-300 bg-zinc-500/10 border-zinc-500/40",
	neutral: "text-neutral-300 bg-neutral-500/10 border-neutral-500/40",
	stone: "text-stone-300 bg-stone-500/10 border-stone-500/40",
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
	const startTime = startDate.toLocaleString("en-GB", {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	})

	const startDateLocaleString = startDate.toLocaleString("en-GB", {
		day: "numeric",
		month: "numeric",
		year: "numeric",
	})

	const endTime = endDate.toLocaleString("en-GB", {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	})

	const calMetaData = useGetCalendarMeta(calendar || "")
	const themeStyles = eventEntryStyles[calMetaData.color]

	const isToday = startDate.toDateString() === new Date().toDateString()
	const timeToStart = startDate.getTime() - new Date().getTime()
	const isRunning = startDate < new Date() && endDate > new Date()
	const isPast = endDate < new Date()

	const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" })

	return (
		<div
			className={classNames(
				"relative flex flex-col rounded-lg border border-neutral-300/10 bg-neutral-300/10 px-4 py-4",
				isRunning && "border-red-500 bg-red-500/10",
				!isRunning &&
					!isPast &&
					isToday &&
					"border-blue-500 bg-blue-500/20",
				isPast && "opacity-40",
			)}
		>
			{isToday ? (
				<>
					{isRunning ? (
						<div className={"flex flex-row items-center gap-2"}>
							<div className={"h-2 w-2 rounded-full bg-red-500"}>
								<div className="h-2 w-2 scale-125 animate-ping rounded-full bg-red-500" />
							</div>

							<h4
								className={
									"font-mono text-sm font-semibold text-red-100"
								}
							>
								Now running {allDay ? "(all day)" : null}
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
			) : (
				<Fragment>
					{/* display start time	*/}
					<h4
						className={classNames(
							"font-mono text-sm font-semibold",
							isRunning ? "text-red-100" : "text-blue-400",
						)}
					>
						{isRunning
							? "Running now"
							: allDay
								? startDateLocaleString + " (all day)"
								: startDateLocaleString}
					</h4>
				</Fragment>
			)}

			<div className={"gap flex flex-col"}>
				<h3 className={"text-lg font-bold text-gray-200"}>{summary}</h3>

				{!allDay ? (
					<div className={"font-mono text-sm text-gray-400"}>
						{startDate !== endDate ? (
							<>
								{/*  add optional string if ending is tomorrow */}
								{startTime} – {endTime}{" "}
								{endDate.getDay() !== startDate.getDay()
									? "(ends tomorrow)"
									: null}
							</>
						) : null}
					</div>
				) : null}
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
						"absolute bottom-4 right-4 rounded-md border px-1.5 py-1 font-mono text-xs",
						themeStyles,
					)}
				>
					{calendar}
				</div>
			)}
		</div>
	)
}
