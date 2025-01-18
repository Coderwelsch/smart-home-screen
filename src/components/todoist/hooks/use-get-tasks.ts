import { useQuery } from "@tanstack/react-query"
import { todoistClient } from "./todoist-client"


export const useGetTasks = (projectIds: string[] | null) => {
	return useQuery({
		queryKey: ["todoist-tasks", projectIds],
		queryFn: async () => {
			if (!projectIds || projectIds.length === 0) {
				return []
			}

			const tasks = await Promise.all(projectIds.map(async (projectId) => {
				return await todoistClient.getTasks({ projectId })
			}))

			return tasks.flat()
		}
	})
}