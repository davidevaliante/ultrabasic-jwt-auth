import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent } from 'react'

interface Iindex {}

const Index: FunctionComponent<Iindex> = () => {
	return <div>This is a protected page that only logged in users can see</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
	// const { req, res } = context
	// const { cookies } = req
	// const { token } = cookies

	// console.log(context.req.headers.cookie, 'context.req.headers.cookie')

	try {
		const isValidToken = await axios.get(
			'http://localhost:3000/api/auth/validate',
			{ headers: { cookie: context.req.headers.cookie } }
		)
	} catch (error) {
		// error or not logged in, redirect to auth
		console.log('error or not logged in, redirect to auth', 'error')
		return {
			redirect: {
				destination: '/login',
			},
			props: {},
		}
	}

	// if (!token) {
	// 	res.writeHead(302, { Location: '/login' })
	// 	res.end()
	// }

	return {
		props: {},
	}
}

export default Index
