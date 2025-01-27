import { useGetProjects } from "@/features/todoist/hooks/use-get-projects"
import {
	FixedTaskType,
	useGetTasks,
} from "@/features/todoist/hooks/use-get-tasks"
import { useMemo } from "react"

interface MappedProjectTasks {
	projectId: string
	projectName: string
	color: string
	tasks: FixedTaskType[]
}

export const useGetMappedProjectTasks = () => {
	const { data: projects, ...projectsQuery } = useGetProjects()
	const { data: tasks, ...tasksQuery } = useGetTasks(
		projects?.map((project) => project.id) || null,
	)

	const mappedProjectTasks: MappedProjectTasks[] = useMemo(() => {
		if (!projects || !tasks) {
			return []
		}

		return projects.reduce((acc, project) => {
			const projectData: MappedProjectTasks = {
				projectId: project.id,
				projectName: project.name,
				color: project.color,
				tasks: [],
			}

			const projectTasks = tasks.reduce((acc, task) => {
				const isParentFromAnotherTask =
					task.parentId && task.parentId !== task.id

				if (task.projectId === project.id && !isParentFromAnotherTask) {
					acc.push(task)
				} else if (isParentFromAnotherTask) {
					const parentTask = tasks.find((t) => t.id === task.parentId)

					if (parentTask) {
						if (!parentTask.subTasks) {
							parentTask.subTasks = []
						}

						// check if task is not already in subTasks
						if (
							!parentTask.subTasks.find((t) => t.id === task.id)
						) {
							parentTask.subTasks.push(task)
						}
					}
				}

				return acc
			}, [] as FixedTaskType[])

			projectData.tasks = projectTasks
			acc.push(projectData)

			return acc
		}, [] as MappedProjectTasks[])
	}, [projects, tasks])

	return {
		isLoading: projectsQuery.isLoading || tasksQuery.isLoading,
		projects: mappedProjectTasks,
	}
}
