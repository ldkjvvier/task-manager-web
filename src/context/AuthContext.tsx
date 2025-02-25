import { createContext } from 'react'
import { User, LoginData, RegisterData } from '../models/user'

interface AuthContextType {
	isAuthenticated: boolean
	user: User
	error: string
	saveUser: (userData: User) => void
	isLoading: boolean
	logout: () => Promise<void>
	signin: (credentials: LoginData) => Promise<void>
	signup: (credentials: RegisterData) => Promise<void>
	createCategory: (category: string) => Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

export { AuthContext }
