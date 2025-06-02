const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const pool = require('../db.js')

const pathToPrivKey = path.join(__dirname, '..', 'id_rsa_priv.pem')
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8')
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8')

function genPassword(password) {
	const salt = crypto.randomBytes(32).toString('hex')
	const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

	return {
		salt,
		hash,
	}
}

function verifyPassword(password, hash, salt) {
	const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
	return hash === hashVerify
}

function issueJWT(id) {
	const expiresIn = '1d'

	const payload = {
		sub: id,
		iat: Date.now(),
	}

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		expiresIn,
		algorithm: 'RS256',
	})

	return {
		token: 'Bearer ' + signedToken,
		token: signedToken,
		expiresIn,
	}
}

// Attach user to request object
async function authMiddleware(req, res, next) {
	if (req.cookies.jwt) {
		// const tokenParts = req.cookies.jwt.split(' ')
		const token = decodeURIComponent(req.cookies.jwt)

		// if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
		if (token.match(/\S+\.\S+\.\S+/) !== null) {
			try {
				// const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
				const verification = jsonwebtoken.verify(token, PUB_KEY, {
					algorithms: ['RS256'],
				})

				const query_selectUserById =
					'SELECT id, email, google_id, name, password FROM users WHERE id = $1'
				const user = await pool.query(query_selectUserById, [verification.sub])

				req.user = user.rows[0]
				return next() // user found
			} catch (err) {
				// invalid jwt
				return res.status(401).json({
					success: false,
					message: 'You are not authorized to visit this route',
				})
			}
		}
    }

    return next() // no user found
}

module.exports.genPassword = genPassword
module.exports.verifyPassword = verifyPassword
module.exports.issueJWT = issueJWT
module.exports.authMiddleware = authMiddleware
