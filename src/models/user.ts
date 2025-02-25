// Interfaz para el usuario
export interface User {
	id: string
	email: string
	categories: Category[]
}

export interface Category {
	id: string
	name: string
}

export interface LoginData extends Omit<User, 'id' | 'categories'> {
	password: string
}
export interface RegisterData
	extends Omit<User, 'id' | 'categories'> {}
