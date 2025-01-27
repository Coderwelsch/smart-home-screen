import { FixedTaskType } from "@/features/todoist/hooks/use-get-tasks"
import { Task as TaskComp } from "@/features/todoist/task"
import { classNames } from "@/lib"
import * as React from "react"
import { FC } from "react"

interface ProjectColorClassNames {
	root: string
	checkbox: string
	badge: string
}

const COLOR_MAP: Record<string, ProjectColorClassNames> = {
	charcoal: {
		root: "border border-gray-400/10 text-gray-100 bg-gray-400/10",
		checkbox: "border border-gray-400",
		badge: "bg-gray-400 border text-gray-800",
	},
	mint_green: {
		root: "border border-green-500/10 text-green-200 bg-green-500/10",
		checkbox: "border border-green-500",
		badge: "bg-green-500 border text-gray-800",
	},
	red: {
		root: "border border-red-600/10 text-red-200 bg-red-600/10",
		checkbox: "border border-red-400",
		badge: "bg-red-500 border border-red-300 text-gray-800",
	},
	blue: {
		root: "border border-blue-500/10 text-blue-200 bg-blue-500/10",
		checkbox: "border border-blue-500",
		badge: "bg-blue-500 border border-blue-400 text-blue-950",
	},
	grape: {
		root: "border border-purple-600/10 text-purple-200 bg-purple-600/10",
		checkbox: "border border-purple-600",
		badge: "bg-purple-500 border border-purple-400 text-gray-800",
	},
	magenta: {
		root: "border border-pink-500/10 text-pink-200 bg-pink-500/10",
		checkbox: "border border-pink-500",
		badge: "bg-pink-500 border text-gray-800",
	},
	yellow: {
		root: "border border-yellow-500/10 text-yellow-200 bg-yellow-500/10",
		checkbox: "border border-yellow-500",
		badge: "bg-yellow-500 border text-gray-800",
	},
	// TODO: Add more colors
	// "orange": "bg-orange-500",
	// "yellow": "bg-yellow-500",
	// "olive": "bg-green-600",
	// "green": "bg-green-500",
	// "mint": "bg-teal-500",
	// "teal": "bg-teal-600",
	// "sky": "bg-blue-400",
	// "blue": "bg-blue-500",
	// "grape": "bg-purple-600",
	// "violet": "bg-purple-500",
	// "lavender": "bg-purple-400",
	// "pink": "bg-pink-500",
	// "salmon": "bg-red-400",
	// "peach": "bg-orange-300"
}

interface ProjectProps {
	tasks: FixedTaskType[]
	id: string
	name: string
	color: string
}

export const Project: FC<ProjectProps> = ({ tasks, name, id, color }) => {
	if (!tasks) {
		return null
	}

	if (tasks.length === 0) {
		return null
	}

	const completedTasks = tasks.filter((task) => task.isCompleted)
	const openTasks = tasks.filter((task) => !task.isCompleted)
	const projectColor =
		color in COLOR_MAP ? COLOR_MAP[color] : COLOR_MAP["charcoal"]

	if (!(color in COLOR_MAP)) {
		console.warn(`Project color ${color} not found in COLOR_MAP`)
	}

	return (
		<div
			className={classNames(
				"flex flex-col gap-2 rounded-lg px-4 py-3",
				projectColor.root,
			)}
		>
			<h2 className="flex flex-row items-center justify-between gap-2 text-lg font-bold">
				<span>{name}</span>

				<span
					className={classNames(
						"rounded-full px-1.5 py-1 font-mono text-xs",
						projectColor.badge,
					)}
				>
					{completedTasks.length}/{tasks.length}
				</span>
			</h2>

			<ul className={"flex flex-col gap-1"}>
				{[...openTasks, ...completedTasks].map((task) => (
					<TaskComp
						key={`${id}-${task.id}`}
						task={task}
						projectColor={projectColor}
					/>
				))}
			</ul>
		</div>
	)
}
