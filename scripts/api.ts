import dotenv from "dotenv"
import http, { IncomingMessage, ServerResponse } from "http"
import path from "node:path"
import { URL } from "node:url"
import url from "url"
import { getLatestCalendarData } from "./calendar"

const __dirname = new URL(".", import.meta.url).pathname

dotenv.config({ path: path.resolve(__dirname, "../.env") })

// eslint-disable-next-line no-undef
const PORT = process.env.REACT_APP_API_PORT || 3001
// eslint-disable-next-line no-undef

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
	if (!req.url) {
		res.statusCode = 400
		res.end("No URL provided")
		return
	}

	const { pathname } = url.parse(req.url)

	if (pathname === "/calendar") {
		getLatestCalendarData().then((data) => {
			res.setHeader("Content-Type", "application/json")
			res.setHeader("Access-Control-Allow-Origin", "*")

			res.end(JSON.stringify(data))
		})
	} else {
		res.statusCode = 404
		res.end("Not Found")
	}
}

const server = http.createServer(requestHandler)

server.listen(PORT, () => {
	console.log(`API is listening on http://localhost:${PORT}`)
})

// TODO: remove this
getLatestCalendarData()
