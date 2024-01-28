import { twMerge } from "tailwind-merge"


export const classNames = (...args: Array<any>) => {
	return twMerge(...args.filter(Boolean))
}