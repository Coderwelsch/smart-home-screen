import animateScrollTo from "animated-scroll-to"
import { useEffect, useState } from "react"


interface UseElementScrolldownProps {
	element: HTMLElement | null,
	delay?: number,
	enabled?: boolean,
	speed?: number,
}


export const useSmoothAutoScroll = ({
	element = document.body,
	enabled = true,
	delay = 4000,
	speed = 500,
}: UseElementScrolldownProps) => {
	const [isScrolledDown, setIsScrolledDown] = useState(false)

	const scroll = () => {
		if (!element) {
			return
		}

		if (isScrolledDown) {
			animateScrollTo(0, {
				speed,
				minDuration: 2000,
				elementToScroll: element,
			}).then(() => {
				setIsScrolledDown(false)
			})

			return
		}

		animateScrollTo(element.scrollHeight, {
			speed,
			minDuration: 2000,
			elementToScroll: element,
		}).then(() => {
			setIsScrolledDown(true)
		})
	}

	useEffect(() => {
		if (!enabled) {
			return
		}

		const interval = setInterval(() => {
			scroll()
		}, delay)

		return () => {
			clearInterval(interval)
		}
	}, [enabled, delay, element, isScrolledDown])
}