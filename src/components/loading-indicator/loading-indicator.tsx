import { classNames } from "../../lib"


interface LoadingIndicatorProps {
	visible: boolean
}


export const LoadingIndicator = ({ visible }: LoadingIndicatorProps) => {
	return (
		<div
			className={ classNames(
				"absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300",
				visible ? "opacity-100" : "opacity-0 pointer-events-none",
			) }
		>
			<div
				className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status"
			>
				<span
					className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
				>Loading...</span>
			</div>
		</div>
	)
}