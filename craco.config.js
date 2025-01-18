// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require("path")


// eslint-disable-next-line no-undef
module.exports = {
	webpack: {
		alias: {
			// eslint-disable-next-line no-undef
			"@": path.resolve(__dirname, "src"),
		},
	},
}