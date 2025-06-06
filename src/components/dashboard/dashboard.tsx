import IconCalendar2DateFill from "@/components/icons/calendar-date-fill"
import {
	CALENDAR_WEBCAL_URLS,
	DISABLE_HOME_PAGE,
	SCROLL_CONTAINER_ID,
	TODOIST_API_KEY,
} from "@/lib/constants"
import { routePaths } from "@/lib/routes"
import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode } from "react"
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
	// Determine if the navigation should be visible based on the number of routes
	// and whether the home page is disabled or not to avoid showing it when there's only one route
	const isNavigationVisible =
		routePaths.filter((routePath) => {
			if (routePath === "/" && DISABLE_HOME_PAGE) {
				return false
			}
		}).length > 1

	return (
		<div className="h-full w-full bg-gray-800">
			<div className="flex h-full">
				{isNavigationVisible ? (
					<div className="flex h-full w-64 shrink-0 flex-col gap-2 bg-gray-900 p-6 pt-8 text-white">
						<h1 className="mb-4 text-sm uppercase tracking-wider text-gray-500">
							Navigation
						</h1>

						<Navigation>
							{!DISABLE_HOME_PAGE && (
								<Navigation.Item href="/" IconBefore={IconHome}>
									Home
								</Navigation.Item>
							)}

							{TODOIST_API_KEY && (
								<Navigation.Item
									href="/todoist"
									IconBefore={IconToDos}
								>
									ToDos
								</Navigation.Item>
							)}

							{CALENDAR_WEBCAL_URLS.length > 0 && (
								<Navigation.Item
									href="/calendar"
									IconBefore={IconCalendar2DateFill}
								>
									Calendar
								</Navigation.Item>
							)}
						</Navigation>
					</div>
				) : null}

				<div
					id={SCROLL_CONTAINER_ID}
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
