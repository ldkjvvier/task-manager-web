export interface Task {
	id: string
	title: string
	description?: string
	dueDate: Date | null
	status: 'pending' | 'completed'
	priority: 'high' | 'medium' | 'low'
}

// Estado global de tareas
export interface TaskState {
	tasks: Task[]
}
