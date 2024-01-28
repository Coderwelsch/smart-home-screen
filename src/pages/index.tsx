import * as React from "react"
import { DashboardBody } from "../components/dashboard/body"
import { Dashboard } from "../components/dashboard/dashboard"


interface HomeProps {
}


export const Home = (props: HomeProps) => {
	return (
		<Dashboard>
			<DashboardBody>
				<h1 className="font-bold text-2xl text-gray-200 mb-4">Welcome</h1>
				<p className="text-gray-400">Welcome to the dashboard. Select a page from the navigation to get started.</p>
			</DashboardBody>
		</Dashboard>
	)
}