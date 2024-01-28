import * as React from "react"
import { JSXElementConstructor, ReactNode, SVGProps } from "react"
import { Link } from "react-router-dom"
import { classNames } from "../../../lib"


interface ItemProps {
	children: ReactNode
	href: string
	IconBefore?: JSXElementConstructor<SVGProps<SVGSVGElement>>
}


export const Item = ({ children, href, IconBefore }: ItemProps) => {
	const isActive = window.location.pathname === href

	return (
		<li className="mb-2">
			<Link
				to={ href }
				className={ classNames(
					"flex flex-row gap-3 text-lg py-2 px-4 rounded-xl font-bold items-center",
					isActive
						? "bg-indigo-500"
						: "bg-gray-800 hover:bg-gray-700",
				) }
			>
				{ IconBefore && (
					<span className="w-5 h-5 flex items-center justify-center">
						<IconBefore className={"w-full h-full"}/>
					</span>
				) }

				{ children }
			</Link>
		</li>
	)
}