import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetMappedProjectTasks } from "@/features/todoist/hooks/use-get-mapped-project-tasks"
import { Project } from "@/features/todoist/project"
import { usePageBasedScrolling } from "@/hooks/use-page-based-scrolling"
import { useRouteCycler } from "@/hooks/use-route-cycler"

import * as React from "react"
import { useState } from "react"

export const Todoist = () => {
	const { isLoading, projects } = useGetMappedProjectTasks()
	const [hasReachedPageEnd, setHasReachedPageEnd] = useState(false)

	useRouteCycler({
		active: hasReachedPageEnd,
	})

	usePageBasedScrolling({
		active: !isLoading,
		onReachedPageEnd: () => setHasReachedPageEnd(true),
	})

	return (
		<Dashboard loading={isLoading}>
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
