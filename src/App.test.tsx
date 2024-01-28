import { render, screen } from "@testing-library/react"

test("renders learn react link", () => {
	render(<p>Hello</p>)
	const linkElement = screen.getByText(/Hello/i)
	expect(linkElement).toBeInTheDocument()
}) 
