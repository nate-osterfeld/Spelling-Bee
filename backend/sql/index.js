const fs = require('fs')
const path = require('path')

const queries = {}

function loadQueries(dir) {
	fs.readdirSync(dir).forEach((item) => {
		const fullPath = path.join(dir, item)
		if (fs.statSync(fullPath).isDirectory()) {
			loadQueries(fullPath)
		} else if (item.endsWith('.sql')) {
			// Convert path to query name (e.g., analytics/get_weighted_accuracy)
			const queryName = path
				.relative(__dirname, fullPath)
				.replace('../sql/', '')
				.replace('.sql', '')
				.replace(/\\/g, '/') // Normalize Windows paths

			queries[queryName] = fs.readFileSync(fullPath, 'utf8')
		}
	})
}

try {
	loadQueries(path.join(__dirname, '../sql'))
	console.log(`Loaded ${Object.keys(queries).length} SQL queries`)
} catch (err) {
	console.error('FATAL: Failed to load SQL queries:', err)
	process.exit(1)
}

module.exports = queries
