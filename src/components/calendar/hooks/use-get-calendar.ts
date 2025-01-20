import { CalEvent } from "@/components/calendar/types"
import { useQuery } from "@tanstack/react-query"
import { PROXY_SERVER_URL } from "@/lib/constants"

export const useGetCalendar = () => {
	return useQuery<CalEvent[]>({
		queryKey: ["calendar"],
		queryFn: async () => {
			const calData = await fetch(`${PROXY_SERVER_URL}/calendar`).then(
				(response) => response.json(),
			)

			return calData
		},
		refetchInterval: 1000 * 60 * 5, // 5 minutes
	})
}
