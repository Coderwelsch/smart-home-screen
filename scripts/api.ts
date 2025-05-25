import * as dotenv from "dotenv"
import { createServer, IncomingMessage, ServerResponse } from "http"
import * as path from "node:path"
import { URL } from "node:url"
import * as url from "url"
import { getLatestCalendarData } from "./calendar"

// @ts-ignore
const __dirname = new URL(".", import.meta.url).pathname

dotenv.config({ path: path.resolve(__dirname, "../.env") })

// eslint-disable-next-line no-undef
const PORT = process.env.REACT_APP_API_PORT || 3001

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

const server = createServer(requestHandler)

server.listen(PORT, () => {
	console.log(`API is listening on http://localhost:${PORT}`)
})

// TODO: remove this
getLatestCalendarData()
