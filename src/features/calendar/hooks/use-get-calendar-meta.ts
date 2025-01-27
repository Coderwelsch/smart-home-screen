import { eventEntryStyles } from "@/features/calendar/event-entry"
import { CALENDAR_WEBCAL_COLORS, CALENDAR_WEBCAL_NAMES } from "@/lib/constants"

interface UseGetCalendarMetaReturn {
	index?: number
	color: keyof typeof eventEntryStyles
}

export const useGetCalendarMeta = (
	calendarName: string,
): UseGetCalendarMetaReturn => {
	const index = CALENDAR_WEBCAL_NAMES.indexOf(calendarName)

	const color: keyof typeof eventEntryStyles = index
		? (CALENDAR_WEBCAL_COLORS[index] as keyof typeof eventEntryStyles)
		: "red"

	return { index, color }
}
