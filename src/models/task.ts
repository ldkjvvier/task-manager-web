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

export type TaskAction =
	| { type: 'ADD_TASK'; payload: Task }
	| { type: 'REMOVE_TASK'; payload: string } // ID de la tarea
	| { type: 'TOGGLE_TASK'; payload: string } // ID para cambiar estado
	| { type: 'UPDATE_TASK'; payload: Task } // Modificar tarea existente
