import { createContext } from 'react'
import { Task, TaskState } from '../models/task'

// Estado inicial
const initialState: TaskState = {
	tasks: [],
}

interface TaskContextType {
	tasks: Task[]
	addTask: (task: Task) => Promise<void>
	removeTask: (taskId: string) => Promise<void>
	toggleTaskStatus: (taskId: string) => void
	updateTask: (updatedTask: Task) => Promise<void>
}

const TaskContext = createContext<TaskContextType>({
	tasks: initialState.tasks,
	addTask: async () => {},
	removeTask: async () => {},
	toggleTaskStatus: () => {},
	updateTask: async () => {},
})

export { TaskContext }
