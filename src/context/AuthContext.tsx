import { createContext } from 'react'
import { User, LoginData, AuthResponse } from '../models/user'

interface AuthContextType {
	isAuthenticated: boolean
	user: User
	error: string
	saveUser: (userData: AuthResponse) => void
	isLoading: boolean
	logout: () => Promise<void>
	signin: (credentials: LoginData) => Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

export { AuthContext }
