import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import {
	Category,
	User,
	LoginData,
	RegisterData,
} from '../models/user'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const loginService = async (
	credentials: LoginData
): Promise<User> => {
	try {
		const response = await fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})
		if (response.status !== 200) {
			throw new Error('Credenciales incorrectas')
		}
		return response.json()
	} catch {
		throw new Error('Error en el inicio de sesión')
	}
}

const registerService = async (
	userData: RegisterData
): Promise<User> => {
	const response = await fetch(`${API_BASE_URL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})
	if (response.status !== 201) {
		throw new Error('Error al registrar el usuario')
	}
	return response.json()
}

const logoutService = async (): Promise<boolean> => {
	const response = await fetch(`${API_BASE_URL}/logout`)
	return response.status === 204
}

const createCategoryInAPI = async (
	categoryName: Category['name'],
	userId: User['id']
): Promise<Category[]> => {
	const res = await fetch(`${API_BASE_URL}/category`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id: userId,
			category: categoryName,
		}),
	})
	if (res.status !== 201) {
		throw new Error('Error al crear la categoría')
	}
	return res.json()
}

const defaultUser: User = {
	id: '',
	email: '',
	categories: [],
}

const AuthProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<User>(defaultUser)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')
	const unauthorized = () => {
		setIsAuthenticated(false)
		setUser(defaultUser)
		setIsLoading(false)
	}

	const saveSessionInfo = (userData: User) => {
		setIsAuthenticated(true)
		setUser(userData)
	}

	const saveUser = (userData: User) => {
		saveSessionInfo(userData)
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

	const signup = async (userData: RegisterData) => {
		setIsLoading(true)
		setError('')

		try {
			const res = await registerService(userData)
			if (res) {
				saveUser(res)
				setIsAuthenticated(true)
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Error al registrar el usuario')
			}
		} finally {
			setIsLoading(false)
		}
	}

	const createCategory = async (category: string) => {
		try {
			const newCategory = await createCategoryInAPI(category, user.id)
			setUser((prevUser) => ({
				...prevUser,
				categories: newCategory,
			}))
		} catch (err) {
			console.error('Error al crear la categoría', err)
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
				signup,
				createCategory,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
