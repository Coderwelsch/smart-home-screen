import { CalEvent } from "@/features/calendar/types"
import { API_PORT } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"

export const useGetCalendar = () => {
	return useQuery<CalEvent[]>({
		queryKey: ["calendar"],
		queryFn: async () => {
			const { protocol, hostname } = window.location

			const calData = await fetch(
				`${protocol}//${hostname}:${API_PORT}/calendar`,
			).then((response) => response.json())

			return calData
		},
		refetchInterval: 1000 * 60 * 5, // 5 minutes
	})
}
