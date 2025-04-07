const fs = require('fs')
const path = require('path')

const SQL = {}

function loadSqlFiles(dir) {
	fs.readdirSync(dir).forEach((item) => {
		const fullPath = path.join(dir, item)
		if (fs.statSync(fullPath).isDirectory()) {
			loadSqlFiles(fullPath)
		} else if (item.endsWith('.sql')) {
			// Convert path to query name (e.g., analytics/get_weighted_accuracy)
			const queryName = path
				.relative(__dirname, fullPath)
				.replace('../sql/', '')
				.replace('.sql', '')
				.replace(/\\/g, '/') // Normalize Windows paths

			SQL[queryName] = fs.readFileSync(fullPath, 'utf8')
		}
	})
}

try {
	loadSqlFiles(path.join(__dirname, '../sql'))
	console.log(`Loaded ${Object.keys(SQL).length} SQL files`)
} catch (err) {
	console.error('FATAL: Failed to load SQL files:', err)
	process.exit(1)
}

module.exports = SQL
