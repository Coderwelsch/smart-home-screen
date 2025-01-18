import * as React from "react"
import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useGetCalendar } from "@/hooks/data/calendar/use-get-calendar"


export const Calendar = () => {
	const calendar = useGetCalendar({})

	return (
		<Dashboard loading={ false }>
			<DashboardBody>
				<h1 className="font-bold text-2xl text-gray-200 mb-4">Calendar</h1>

				<div className={ "flex flex-col gap-3" }>
				</div>
			</DashboardBody>
		</Dashboard>
	)
}