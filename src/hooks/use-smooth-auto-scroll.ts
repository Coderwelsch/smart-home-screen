import { useEffect, useRef } from "react"

interface UseSmoothAutoScrollProps {
	element: HTMLElement | null
	scrollAmount: number
	interval?: number
}

export const useSmoothAutoScroll = ({
	element,
	scrollAmount,
	interval = 5000,
}: UseSmoothAutoScrollProps) => {
	const scrollDirection = useRef(1)

	useEffect(() => {
		if (!element) {
			return
		}

		const scroll = () => {
			if (
				element.scrollTop + element.clientHeight >=
				element.scrollHeight
			) {
				scrollDirection.current = -1
			} else if (element.scrollTop <= 0) {
				scrollDirection.current = 1
			}

			element.scrollBy({
				top: scrollAmount * scrollDirection.current,
				behavior: "smooth",
			})
		}

		const scrollInterval = setInterval(scroll, interval)

		return () => clearInterval(scrollInterval)
	}, [element, scrollAmount, interval])
}
