import { useSmoothAutoScroll } from "@/hooks/ui/use-smooth-auto-scroll"
import { classNames } from "@/lib"

import * as React from "react"
import { useEffect, useRef } from "react"
import Markdown from "react-markdown"

import { DashboardBody } from "../dashboard/body"
import { Dashboard } from "../dashboard/dashboard"
import IconCalendar2DateFill from "../icons/calendar-date-fill"
import { useGetProjects } from "./hooks/use-get-projects"
import { useGetTasks } from "./hooks/use-get-tasks"

interface ProjectColorClassNames {
	root: string
	checkbox: string
	badge: string
}

const COLOR_MAP: Record<string, ProjectColorClassNames> = {
	charcoal: {
		root: "border border-gray-400 text-gray-100",
		checkbox: "border border-gray-400",
		badge: "bg-gray-400 border text-gray-800",
	},
	mint_green: {
		root: "border border-green-500 text-green-200",
		checkbox: "border border-green-500",
		badge: "bg-green-500 text-gray-800",
	},
	red: {
		root: "border border-red-600 text-red-200",
		checkbox: "border border-red-600",
		badge: "bg-red-600 text-gray-800",
	},
	blue: {
		root: "border border-blue-500 text-blue-200",
		checkbox: "border border-blue-500",
		badge: "bg-blue-500 text-gray-800",
	},
	grape: {
		root: "border border-purple-600 text-purple-200",
		checkbox: "border border-purple-600",
		badge: "bg-purple-600 text-gray-800",
	},
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

export const Todoist = () => {
	const { data: projects, ...projectsQuery } = useGetProjects()
	const { data: tasks, ...tasksQuery } = useGetTasks(
		projects?.map((project) => project.id) || null,
	)

	const scrollRef = useRef<HTMLDivElement>(null)

	useSmoothAutoScroll({
		element: scrollRef.current,
		delay: 5000,
	})

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0
		}
	}, [scrollRef])

	return (
		<Dashboard
			loading={projectsQuery.isLoading || tasksQuery.isLoading}
			ref={scrollRef}
		>
			<DashboardBody>
				<h1 className="mb-4 text-2xl font-bold text-gray-200">ToDos</h1>

				<div className={"flex flex-col gap-3"}>
					{projects?.map((project) => {
						if (!tasks) {
							return null
						}

						const projectTasks = tasks.filter(
							(task) => task.projectId === project.id,
						)

						if (projectTasks.length === 0) {
							return null
						}

						const completedTasks = projectTasks.filter(
							(task) => task.isCompleted,
						)
						const openTasks = projectTasks.filter(
							(task) => !task.isCompleted,
						)
						const projectColor =
							project.color in COLOR_MAP
								? COLOR_MAP[project.color]
								: COLOR_MAP["charcoal"]

						if (!(project.color in COLOR_MAP)) {
							console.warn(
								`Project color ${project.color} not found in COLOR_MAP`,
							)
						}

						return (
							<div
								key={project.id}
								className={classNames(
									"flex flex-col gap-2 rounded-lg px-4 py-2",
									projectColor.root,
								)}
							>
								<h2 className="flex flex-row items-center justify-between gap-2 text-lg font-bold">
									<span>{project.name}</span>

									<span
										className={classNames(
											"rounded-full px-1.5 py-1 font-mono text-xs",
											projectColor.badge,
										)}
									>
										{completedTasks.length}/
										{projectTasks.length}
									</span>
								</h2>

								<ul className={"flex flex-col gap-1"}>
									{[...openTasks, ...completedTasks].map(
										(task) => {
											return (
												<li
													key={`${project.id}-${task.id}`}
													className="flex flex-row items-center gap-2"
												>
													<div
														className={classNames(
															"mt-1 h-4 w-4 shrink-0 self-start rounded-full",
															projectColor.checkbox,
														)}
													>
														{task.isCompleted
															? "√"
															: ""}
													</div>

													<div
														className={
															"flex flex-col gap-1"
														}
													>
														<p
															className={
																"font-semibold"
															}
														>
															{task.content}
														</p>

														{task.due && (
															<p
																className={
																	"gap flex flex-row items-center font-mono text-xs font-bold opacity-60"
																}
															>
																<IconCalendar2DateFill
																	className={
																		"mr-1.5 inline-block"
																	}
																/>
																{task.due.date}
															</p>
														)}

														<Markdown
															className={
																"text-xs opacity-60"
															}
														>
															{task.description.substring(
																0,
																128,
															)}
														</Markdown>
													</div>
												</li>
											)
										},
									)}
								</ul>
							</div>
						)
					})}
				</div>
			</DashboardBody>
		</Dashboard>
	)
}
