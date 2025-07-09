import { classNames } from "@/lib"
import { ReactNode } from "react"

interface DashboardBodyProps {
	children: ReactNode
	className?: string
}

export const DashboardBody = ({ children, className }: DashboardBodyProps) => {
	return <div className={classNames("flex-1 p-6", className)}>{children}</div>
}
