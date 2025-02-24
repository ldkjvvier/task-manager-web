import { useState, useEffect, ReactNode } from 'react'
import { TaskContext } from '../context/TaskContext'
import { Task } from '../models/task'

const fetchTasksFromAPI = async (): Promise<Task[]> => {
	const TASKMOCK: Task[] = [
		{
			id: '1',
			title: 'Tarea 1',
			description: 'Descripcion de la tarea 1',
			dueDate: new Date(),
			status: 'pending',
			priority: 'high',
		},
		{
			id: '2',
			title: 'Tarea 2',
			description: 'Descripcion de la tarea 2',
			dueDate: new Date(),
			status: 'pending',
			priority: 'medium',
		},
		{
			id: '3',
			title: 'Tarea 3',
			description: 'Descripcion de la tarea 3',
			dueDate: new Date(),
			status: 'completed',
			priority: 'low',
		},
	]
	return TASKMOCK
}

const createTaskInAPI = async (task: Task): Promise<Task> => {
	const res = await fetch('/api/tasks', {
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
	const res = await fetch(`/api/tasks/${taskId}`, {
		method: 'DELETE',
	})
	if (res.status !== 200) {
		throw new Error('Error al eliminar la tarea')
	}
}

const updateTaskInAPI = async (task: Task): Promise<Task> => {
	const res = await fetch(`/api/tasks/${task.id}`, {
		method: 'PUT',
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

	useEffect(() => {
		const loadTasks = async () => {
			try {
				const tasks = await fetchTasksFromAPI()
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
