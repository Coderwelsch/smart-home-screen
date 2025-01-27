import { useQuery } from "@tanstack/react-query"
import { todoistClient } from "./todoist-client"


export const useGetProjects = () => {
	return useQuery({
		queryKey: ["todoist-projects"],
		queryFn: async () => {
			return await todoistClient.getProjects()
		}
	})
}