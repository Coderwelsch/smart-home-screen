import IconCalendar2DateFill from "@/components/icons/calendar-date-fill"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode } from "react"
import { CALENDAR_WEBCAL_URL, TODOIST_API_KEY } from "@/lib/constants"
import IconHome from "../icons/home"
import IconToDos from "../icons/todos"
import { LoadingIndicator } from "../loading-indicator/loading-indicator"
import { Navigation } from "../navigation/navigation"

interface DashboardProps {
	children: ReactNode
	loading?: boolean
}

const InternalDashboard = (
	{ children, loading = false }: DashboardProps,
	ref: ForwardedRef<HTMLDivElement>,
) => {
	return (
		<div className="h-full w-full bg-gray-800">
			<div className="flex h-full">
				<div className="flex h-full w-64 shrink-0 flex-col gap-2 bg-gray-900 p-6 pt-8 text-white">
					<h1 className="mb-4 text-sm uppercase tracking-wider text-gray-500">
						Navigation
					</h1>

					<Navigation>
						<Navigation.Item href="/" IconBefore={IconHome}>
							Home
						</Navigation.Item>

						{TODOIST_API_KEY && (
							<Navigation.Item
								href="/todoist"
								IconBefore={IconToDos}
							>
								ToDos
							</Navigation.Item>
						)}

						{CALENDAR_WEBCAL_URL.length > 0 && (
							<Navigation.Item
								href="/calendar"
								IconBefore={IconCalendar2DateFill}
							>
								Calendar
							</Navigation.Item>
						)}
					</Navigation>
				</div>

				<div
					className={
						"relative grow overflow-x-hidden overflow-y-scroll"
					}
					ref={ref}
				>
					<LoadingIndicator visible={loading} />

					{children}
				</div>
			</div>
		</div>
	)
}

// eslint-disable-next-line react/display-name
export const Dashboard = forwardRef(InternalDashboard)
