import { useQuery } from "@tanstack/react-query"
import { CALENDAR_WEBCAL_URLS, PROXY_SERVER_URL } from "@/lib/constants"


interface UseGetCalendarProps {
}


export const useGetCalendar = (props: UseGetCalendarProps) => {
	return useQuery({
		queryKey: ["calendar"],
		queryFn: async () => {
			const urls = CALENDAR_WEBCAL_URLS

			console.log("urls", urls)

			const responses = await Promise.all(urls.map((url) => fetch(`${PROXY_SERVER_URL}/${url}`)))

			const texts = await Promise.all(responses.map((response) => response.text()))

			const parsed = texts.map((text) => {
				const lines = text.split("\n")

				return lines.filter((line) => line.startsWith("SUMMARY:")).map((line) => line.replace("SUMMARY:", "").trim())
			})

			console.log("parsed", parsed)

			return parsed
		},
	})
}