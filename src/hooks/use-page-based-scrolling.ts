import { SCROLL_CONTAINER_ID } from "@/lib/constants"
import { useCallback, useEffect, useState } from "react"

interface UsePageBasedScrollingProps {
	scrollContainerId?: string
	pageDuration?: number
	onCycle?: () => void
	onReachedPageEnd?: () => void
	active?: boolean
}

export const usePageBasedScrolling = ({
	scrollContainerId = SCROLL_CONTAINER_ID,
	pageDuration = 2000,
	active,
	onCycle,
	onReachedPageEnd,
}: UsePageBasedScrollingProps) => {
	const [scrollDirection, setScrollDirection] = useState(1)

	const scroll = useCallback(() => {
		const scrollContainer = document.getElementById(scrollContainerId)

		if (!scrollContainer) {
			console.error(`Element with id ${scrollContainerId} not found`)
			return
		}

		const remainingScrollToBottom =
			scrollContainer.scrollHeight -
			scrollContainer.clientHeight * 2 -
			scrollContainer.scrollTop
		const remainingScrollToTop =
			scrollContainer.scrollTop - scrollContainer.clientHeight

		if (scrollDirection === 1 && remainingScrollToBottom < 60) {
			console.log("scrolling to bottom")

			scrollContainer.scrollTo({
				top: scrollContainer.scrollHeight,
				behavior: "smooth",
			})
		} else if (scrollDirection === -1 && remainingScrollToTop < 60) {
			console.log("scrolling to top")

			scrollContainer.scrollTo({
				top: 0,
				behavior: "smooth",
			})
		} else {
			console.log("scrolling by half")
			scrollContainer.scrollBy({
				top:
					scrollContainer.clientHeight * scrollDirection -
					scrollContainer.clientHeight / 2,
				behavior: "smooth",
			})
		}

		if (scrollContainer.scrollTop === 0 && scrollDirection === -1) {
			onCycle?.()
		}

		if (
			scrollContainer.scrollTop + scrollContainer.clientHeight >=
			scrollContainer.scrollHeight
		) {
			setScrollDirection(-1)
			onReachedPageEnd?.()
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
