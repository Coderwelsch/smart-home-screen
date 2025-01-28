import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useRouteCycler } from "@/hooks/use-route-cycler"
import * as React from "react"

export const Home = () => {
	useRouteCycler({ interval: 2000 }) // Change route every 5 seconds

	return (
		<Dashboard>
			<DashboardBody>
				<h1 className="mb-4 text-2xl font-bold text-gray-200">
					Welcome
				</h1>
				<p className="text-gray-400">
					Welcome to the dashboard. Select a page from the navigation
					to get started.
				</p>
			</DashboardBody>
		</Dashboard>
	)
}
