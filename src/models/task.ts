import { Category, User } from './user'

export interface Task {
	id: string
	title: string
	description?: string
	dueDate: Date | null
	status: 'pending' | 'completed'
	priority: 'high' | 'medium' | 'low'
	userId: User['id']
	categoryId: Category['id'] | null
}

// Estado global de tareas
export interface TaskState {
	tasks: Task[]
}
