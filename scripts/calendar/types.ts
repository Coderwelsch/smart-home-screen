export interface CalEvent {
	summary: string
	notes?: string | null
	startDate: Date
	endDate: Date
	allDay?: boolean
	calendar?: string
}
