import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetMappedProjectTasks } from "@/features/todoist/hooks/use-get-mapped-project-tasks"
import { Project } from "@/features/todoist/project"
import { usePageBasedScrolling } from "@/hooks/use-page-based-scrolling"
import { useRouteCycler } from "@/hooks/use-route-cycler"

import * as React from "react"
import { useEffect, useRef, useState } from "react"

export const Todoist = () => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const { isLoading, projects } = useGetMappedProjectTasks()
	const [isCycleDone, setIsCycleDone] = useState(false)

	useRouteCycler({
		active: isCycleDone,
	})

	usePageBasedScrolling({
		container: scrollRef.current,
		pageDuration: 6000,
		active: !isLoading,
		onCycle: () => setIsCycleDone(true),
	})

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0
		}
	}, [scrollRef])

	return (
		<Dashboard loading={isLoading} ref={scrollRef}>
			<DashboardBody>
				<h1 className="mb-4 text-2xl font-bold text-gray-200">ToDos</h1>

				{projects?.length ? (
					<div className={"flex flex-col gap-3"}>
						{projects?.map((project) => {
							return (
								<Project
									key={project.projectId}
									tasks={project.tasks}
									name={project.projectName}
									id={project.projectId}
									color={project.color}
								/>
							)
						})}
					</div>
				) : null}
			</DashboardBody>
		</Dashboard>
	)
}
