import { ReactNode } from "react"


interface DashboardBodyProps {
	children: ReactNode
}


export const DashboardBody = ({ children }: DashboardBodyProps) => {
	return (
		<div className="flex-1 p-6">
			{ children }
		</div>
	)
}