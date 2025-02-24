// src/context/AuthProvider.tsx

import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { User, LoginData, AuthResponse } from '../models/user'
import { Navigate } from 'react-router'

const loginService = async (
	credentials: LoginData
): Promise<AuthResponse> => {
	const res = await new Promise<AuthResponse>((resolve, reject) => {
		setTimeout(() => {
			if (
				credentials.email === 'test1@test.com' &&
				credentials.password === '123456'
			) {
				resolve({
					statusCode: 200,
					body: {
						user: {
							id: '1',
							name: 'Test User',
							email: 'test1@test.com',
						},
					},
				})
			} else {
				reject(new Error('Credenciales incorrectas'))
			}
		}, 1000)
	})
	return res
}

export const logoutService = async (): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, 1000)
	})
}

const defaultUser = {
	id: '',
	name: '',
	email: '',
} as User

const AuthProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(true)
	const [user, setUser] = useState<User>(defaultUser)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

	const unauthorized = () => {
		setIsAuthenticated(false)
		setUser(defaultUser)
		setIsLoading(false)
		return <Navigate to="/" />
	}

	const saveSessionInfo = (user: User) => {
		setIsAuthenticated(true)
		setUser(user)
	}

	const saveUser = (userData: AuthResponse) => {
		saveSessionInfo(userData.body.user)
	}

	const logout = async () => {
		const res = await logoutService()
		if (res) {
			unauthorized()
		}
	}

	const signin = async (credentials: LoginData) => {
		setIsLoading(true)
		setError('')

		try {
			const res = await loginService(credentials)
			if (res) {
				saveUser(res)
				setIsAuthenticated(true)
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Error en el inicio de sesión')
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsLoading(false)
	}, [])

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				error,
				saveUser,
				isLoading,
				logout,
				signin,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
