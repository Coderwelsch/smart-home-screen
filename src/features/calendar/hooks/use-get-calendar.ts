import { CalEvent } from "@/features/calendar/types"
import { API_PORT } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"

export const useGetCalendar = () => {
	return useQuery<CalEvent[]>({
		initialData: [],
		queryKey: ["calendar"],
		queryFn: async () => {
			const { protocol, hostname } = window.location

			const calData = await fetch(
				`${protocol}//${hostname}:${API_PORT}/calendar`,
			)

			if (!calData.ok) {
				throw new Error(
					`Failed to fetch calendar data: ${calData.statusText}`,
				)
			}

			return calData.json()
		},
		retry: false,
		refetchInterval: 1000 * 60 * 5, // 5 minutes
	})
}
