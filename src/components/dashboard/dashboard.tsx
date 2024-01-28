import * as React from "react"
import { ForwardedRef, forwardRef, ReactNode } from "react"
import { CALENDAR_WEBCAL_URLS, TODOIST_API_KEY } from "../../lib/constants"
import IconHome from "../icons/home"
import IconToDos from "../icons/todos"
import { LoadingIndicator } from "../loading-indicator/loading-indicator"
import { Navigation } from "../navigation/navigation"
import { DashboardBody } from "./body"


interface DashboardProps {
	children: ReactNode
	loading?: boolean
}

const InternalDashboard = ({ children, loading = false }: DashboardProps, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<div className="bg-gray-800 w-full h-full">
			<div className="flex h-full">
				<div className="w-64 bg-gray-900 text-white p-6 pt-8 h-full flex flex-col gap-2 shrink-0">
					<h1 className="text-sm uppercase mb-4 tracking-wider text-gray-500">Navigation</h1>

					<Navigation>
						<Navigation.Item href="/" IconBefore={ IconHome }>Home</Navigation.Item>

						{ TODOIST_API_KEY && (
							<Navigation.Item href="/todos" IconBefore={ IconToDos }>ToDos</Navigation.Item>
						) }

						{ CALENDAR_WEBCAL_URLS.length > 0 && (
							<Navigation.Item href="/calendar" IconBefore={ IconToDos }>Calendar</Navigation.Item>
						)}
					</Navigation>
				</div>

				<div className={"relative grow overflow-y-scroll overflow-x-hidden"} ref={ref}>
					<LoadingIndicator visible={loading}/>

					{ children }
				</div>
			</div>
		</div>
	)
}

// eslint-disable-next-line react/display-name
export const Dashboard = forwardRef(InternalDashboard)

