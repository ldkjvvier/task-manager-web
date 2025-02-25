import { useState, useEffect, ReactNode } from 'react'
import { TaskContext } from '../context/TaskContext'
import { Task } from '../models/task'
import { User } from '../models/user'
import { useAuth } from '../hooks/useAuth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTasksFromAPI = async (
	userId: User['id']
): Promise<Task[]> => {
	const res = await fetch(`${API_BASE_URL}/tasks/${userId}`)
	if (res.status !== 200) {
		throw new Error('Error al cargar las tareas')
	}
	return res.json()
}

const createTaskInAPI = async (task: Task): Promise<Task> => {
	const res = await fetch(`${API_BASE_URL}/tasks`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	})

	if (res.status !== 201) {
		throw new Error('Error al crear la tarea')
	}
	return res.json()
}

const removeTaskFromAPI = async (taskId: string): Promise<void> => {
	const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
		method: 'DELETE',
	})
	if (res.status !== 204) {
		throw new Error('Error al eliminar la tarea')
	}
}

const updateTaskInAPI = async (task: Task): Promise<Task> => {
	const res = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	})
	if (res.status !== 200) {
		throw new Error('Error al actualizar la tarea')
	}
	return res.json()
}

const TaskProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>([])
	const { user } = useAuth()
	useEffect(() => {
		const loadTasks = async () => {
			try {
				const tasks = await fetchTasksFromAPI(user.id)
				setTasks(tasks)
			} catch (err) {
				console.error('Error al cargar las tareas', err)
			}
		}
		loadTasks()
	}, [])

	const addTask = async (task: Task) => {
		try {
			const newTask = await createTaskInAPI(task)
			setTasks((prevTasks) => [...prevTasks, newTask])
		} catch (err) {
			console.error('Error al agregar la tarea', err)
		}
	}

	const removeTask = async (taskId: string) => {
		try {
			await removeTaskFromAPI(taskId)
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId)
			)
		} catch (err) {
			console.error('Error al eliminar la tarea', err)
		}
	}

	const toggleTaskStatus = (taskId: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId
					? {
							...task,
							status:
								task.status === 'pending' ? 'completed' : 'pending',
					  }
					: task
			)
		)
	}

	const updateTask = async (updatedTask: Task) => {
		try {
			const newTask = await updateTaskInAPI(updatedTask)
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === newTask.id ? newTask : task
				)
			)
		} catch (err) {
			console.error('Error al actualizar la tarea', err)
		}
	}

	return (
		<TaskContext.Provider
			value={{
				tasks,
				addTask,
				removeTask,
				toggleTaskStatus,
				updateTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}

export default TaskProvider
