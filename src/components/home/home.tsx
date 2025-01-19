import * as React from "react"
import { DashboardBody } from "@/components/dashboard/body"
import { Dashboard } from "@/components/dashboard/dashboard"

export const Home = () => {
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
