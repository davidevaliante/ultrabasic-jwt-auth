import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const JWT_SECRET = 'MY SUPER SECRET KEY THAT SHOULD BE SAVED IN A .ENV FILE'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.cookies, 'cookies')
	const token = req.cookies.token

	if (!token) return res.status(401).json({ error: 'No token provided' })

	const isValidToken = jwt.verify(token, JWT_SECRET)

	if (!isValidToken) return res.status(401).json({ error: 'Invalid token' })

	return res.status(200).json({ status: 'logged-in' })
}
