import { useCallback, useEffect, useState } from "react"

interface UsePageBasedScrollingProps {
	container: HTMLElement | null
	pageDuration: number
	onCycle?: () => void
	active?: boolean
}

export const usePageBasedScrolling = (props: UsePageBasedScrollingProps) => {
	const { container, pageDuration, active, onCycle } = props
	const [scrollDirection, setScrollDirection] = useState(1)

	const scroll = useCallback(() => {
		if (!container) {
			return
		}

		container.scrollBy({
			top: container.clientHeight * scrollDirection,
			behavior: "smooth",
		})

		if (container.scrollTop === 0 && scrollDirection === -1) {
			onCycle?.()
		}

		if (
			container.scrollTop + container.clientHeight >=
			container.scrollHeight
		) {
			setScrollDirection(-1)
		} else if (container.scrollTop <= 0) {
			setScrollDirection(1)
		}
	}, [container, onCycle, scrollDirection])

	useEffect(() => {
		if (!active) {
			return
		}

		const scrollInterval = setInterval(scroll, pageDuration)

		return () => clearInterval(scrollInterval)
	}, [pageDuration, scroll, active])
}
