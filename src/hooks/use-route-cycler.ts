import { routePaths } from "@/lib/routes"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface UseRouteCyclerProps {
	interval?: number
	active?: boolean
}

export const useRouteCycler = ({
	interval = 1000,
	active = true,
}: UseRouteCyclerProps) => {
	const navigate = useNavigate()
	const routes = routePaths

	useEffect(() => {
		let currentIndex = routes.indexOf(window.location.pathname)

		if (!active) {
			return
		}

		const cycleRoutes = () => {
			currentIndex = (currentIndex + 1) % routes.length
			navigate(routes[currentIndex])
		}

		const intervalId = setInterval(cycleRoutes, interval)

		return () => clearInterval(intervalId)
	}, [navigate, routes, interval, active])
}
