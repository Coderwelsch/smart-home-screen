import { CalEvent } from "@/features/calendar/types"
import { API_URL } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"

export const useGetCalendar = () => {
	return useQuery<CalEvent[]>({
		queryKey: ["calendar"],
		queryFn: async () => {
			const calData = await fetch(`${API_URL}/calendar`).then(
				(response) => response.json(),
			)

			return calData
		},
		refetchInterval: 1000 * 60 * 5, // 5 minutes
	})
}
