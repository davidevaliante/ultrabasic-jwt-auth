import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { CookieSerializeOptions, serialize } from 'cookie'

const JWT_SECRET = 'MY SUPER SECRET KEY THAT SHOULD BE SAVED IN A .ENV FILE'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = req.body

	const cookieOptions: CookieSerializeOptions = {
		httpOnly: true,
		maxAge: 1000000000, // ideally should match the expiry time of the token
		path: '/',
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
	}

	const token = jwt.sign(session, JWT_SECRET, {
		expiresIn: '1d',
	})

	// there is probably some library to do this in a less clunky way but whatever
	res.setHeader('Set-Cookie', serialize('token', token, cookieOptions))

	console.log('token', token)

	return res.status(200).json({ session })
}
