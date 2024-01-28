import * as React from "react"
import { ReactNode } from "react"
import { Item } from "./item/item"


interface NavigationProps {
	children: ReactNode
}


export const Navigation = ({ children }: NavigationProps) => {
	return (
		<nav>
			<ul className={"flex flex-col gap-2"}>
				{ children }
			</ul>
		</nav>
	)
}

Navigation.Item = Item