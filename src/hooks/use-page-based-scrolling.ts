import { SCROLL_CONTAINER_ID } from "@/lib/constants"
import { useCallback, useEffect, useState } from "react"

interface UsePageBasedScrollingProps {
	scrollContainerId?: string
	pageDuration: number
	onCycle?: () => void
	active?: boolean
}

export const usePageBasedScrolling = ({
	scrollContainerId = SCROLL_CONTAINER_ID,
	pageDuration,
	active,
	onCycle,
}: UsePageBasedScrollingProps) => {
	const [scrollDirection, setScrollDirection] = useState(1)

	const scroll = useCallback(() => {
		const scrollContainer = document.getElementById(scrollContainerId)

		if (!scrollContainer) {
			console.error(`Element with id ${scrollContainerId} not found`)
			return
		}

		scrollContainer.scrollBy({
			top: scrollContainer.clientHeight * scrollDirection,
			behavior: "smooth",
		})

		if (scrollContainer.scrollTop === 0 && scrollDirection === -1) {
			onCycle?.()
		}

		if (
			scrollContainer.scrollTop + scrollContainer.clientHeight >=
			scrollContainer.scrollHeight
		) {
			setScrollDirection(-1)
		} else if (scrollContainer.scrollTop <= 0) {
			setScrollDirection(1)
		}
	}, [scrollContainerId, onCycle, scrollDirection])

	useEffect(() => {
		if (!active) {
			return
		}

		const scrollInterval = setInterval(scroll, pageDuration)

		return () => clearInterval(scrollInterval)
	}, [pageDuration, scroll, active])
}
