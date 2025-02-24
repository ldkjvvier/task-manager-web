// Interfaz para el usuario
export interface User {
	id: string
	name: string
	email: string
}

// Estado global del usuario (autenticación)
export interface AuthState {
	user: User | null
	isAuthenticated: boolean
}

export interface LoginData {
	email: string
	password: string
}

export interface AuthResponse {
	statusCode: number
	body: {
		user: User
		message?: string
	}
}

// Acciones para manejar el estado del usuario
export type AuthAction =
	| { type: 'LOGIN'; payload: User }
	| { type: 'LOGOUT' }
