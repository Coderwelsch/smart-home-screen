import IconCalendar2DateFill from "@/components/icons/calendar-date-fill"
import { FixedTaskType } from "@/features/todoist/hooks/use-get-tasks"
import { classNames } from "@/lib"
import * as React from "react"
import { FC } from "react"
import Markdown from "react-markdown"

export const Task: FC<{
	projectColor: {
		root: string
		checkbox: string
		badge: string
	}
	task: FixedTaskType
}> = ({
	task: { isCompleted, description, due, content, subTasks },
	projectColor,
}) => {
	return (
		<li className="flex flex-row items-center gap-2">
			<div
				className={classNames(
					"mt-1 h-4 w-4 shrink-0 self-start rounded-full",
					projectColor.checkbox,
				)}
			>
				{isCompleted ? "√" : ""}
			</div>

			<div className={"flex flex-col gap-1"}>
				<div className={"font-semibold [&_a]:underline"}>
					<Markdown>{content}</Markdown>
				</div>

				{subTasks && (
					<ul className={"flex flex-col gap-1"}>
						{subTasks.map((subTask) => (
							<Task
								key={subTask.id}
								task={subTask}
								projectColor={projectColor}
							/>
						))}
					</ul>
				)}

				{due && (
					<p
						className={
							"gap flex flex-row items-center font-mono text-xs font-bold opacity-60"
						}
					>
						<IconCalendar2DateFill
							className={"mr-1.5 inline-block"}
						/>
						{due.date}
					</p>
				)}

				<Markdown className={"text-sm italic opacity-80"}>
					{description.substring(0, 128)}
				</Markdown>
			</div>
		</li>
	)
}
