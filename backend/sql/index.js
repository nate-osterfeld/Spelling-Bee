const fs = require('fs')
const path = require('path')

const migrations = {}
const seeds = {}
const queries = {}

function loadSQL(dir, targetObj, prefix = '') {
	// Verify target object exists
	if (!targetObj) {
		throw new Error(`Target object is undefined for directory: ${dir}`)
	}

	// Verify directory exists
	if (!fs.existsSync(dir)) {
		console.warn(`Directory not found: ${dir}`)
		return
	}

	fs.readdirSync(dir).forEach((item) => {
		const fullPath = path.join(dir, item)
		const stat = fs.statSync(fullPath)

		if (stat.isDirectory()) {
			loadSQL(fullPath, targetObj, `${prefix}${item}/`)
		} else if (item.endsWith('.sql')) {
			const key = `${prefix}${item.replace('.sql', '')}`
			targetObj[key] = fs.readFileSync(fullPath, 'utf8')
		}
	})
}

try {
	loadSQL(path.join(__dirname, 'migrations'), migrations)
	loadSQL(path.join(__dirname, 'seeds'), seeds)
	loadSQL(path.join(__dirname, 'queries'), queries)

	console.log('Successfully loaded:', {
		migrations: Object.keys(migrations).length,
		seeds: Object.keys(seeds).length,
		queries: Object.keys(queries).length,
	})
} catch (err) {
	console.error('FATAL: Failed to load SQL files:', err)
	process.exit(1)
}

module.exports = { migrations, seeds, queries }

