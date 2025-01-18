import http from "http"
import https from "https"
import path from "node:path"
import url from "url"
import dotenv from "dotenv"
import { URL } from 'node:url'; // in Browser, the URL in native accessible on window

const __dirname = new URL('.', import.meta.url).pathname;

dotenv.config({ path: path.resolve(__dirname, "../.env") })

// eslint-disable-next-line no-undef
const PORT = process.env.REACT_APP_PROXY_SERVER_PORT || 3001
// eslint-disable-next-line no-undef

const requestHandler = (req, res) => {
	const targetUrl = url.parse("https://" + req.url.slice(1))

	const options = {
		hostname: targetUrl.hostname,
		port: targetUrl.port || (targetUrl.protocol === "https:" ? 443 : 80),
		path: targetUrl.path,
		method: req.method,
		headers: { 
			...req.headers,
			"Host": targetUrl.hostname,
			"Origin": `https://www.google.com`
		}
	}

	const proxy = (targetUrl.protocol === "https:" ? https : http).request(options, (proxyRes) => {
		res.writeHead(proxyRes.statusCode, {
			...proxyRes.headers,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
		})
		proxyRes.pipe(res, { end: true })
	})

	req.pipe(proxy, { end: true })

	proxy.on("error", (err) => {
		res.writeHead(500, { "Content-Type": "text/plain" })
		res.end("Proxy error: " + err.message)

		console.error("Proxy error", err)
	})
}

const server = http.createServer(requestHandler)

server.listen(PORT, () => {
	console.log(`Proxy server is running on http://localhost:${PORT}`)
})