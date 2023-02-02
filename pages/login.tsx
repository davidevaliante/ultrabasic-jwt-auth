import axios from 'axios'
import React, { FunctionComponent } from 'react'
import Link from 'next/link'

interface Ilogin {}

const login: FunctionComponent<Ilogin> = () => {
	const checkUserCredentialsFromCognito = async () => {
		// Do the cognito request here and suppose the are no errors

		// example cognito successfull response
		return {
			session: {
				startedAt: 123456789,
				expiresAt: 123456789,
				uid: 'topgaming-admin',
			},
		}
	}

	const authFlow = async () => {
		const { session } = await checkUserCredentialsFromCognito()
		// make a request to the backend / API route for a new token
		const response = await axios.post('/api/auth/new-token', session)
	}

	return (
		<div>
			<button onClick={authFlow}>Login With Cognito</button>

			<Link
				prefetch={false}
				style={{ marginLeft: '3rem', background: 'red' }}
				href='/some-protected-page'
			>
				This goes to a super protected page
			</Link>
		</div>
	)
}

export default login
