import { Task } from '@/models/task'
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { TaskForm } from './components/taskForm'
import TaskList from './components/taskList'
import { v4 as uuidv4 } from 'uuid'
import { CustomSnackbar } from './components/SnackBar'
import { isTaskNearDueDate } from '../../helper/TaskNearDueDate'
export const User = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		const tasks: Task[] = [
			{
				id: '1',
				title: 'Tarea 1',
				description: 'Descripción de la tarea 1',
				dueDate: new Date(),
				status: 'pending',
				priority: 'high',
			},
			{
				id: '2',
				title: 'Tarea 2',
				description: 'Descripción de la tarea 2',
				dueDate: new Date(),
				status: 'completed',
				priority: 'medium',
			},
		]
		setTasks(tasks)
	}, [])

	useEffect(() => {
		const nearDueTasks = tasks.filter((task) =>
			isTaskNearDueDate(task.dueDate)
		)

		if (nearDueTasks.length > 0) {
			setOpen(true)
			setMessage(
				`Tienes ${nearDueTasks.length} tareas cerca de vencer`
			)
		}
	}, [tasks])
	const addTask = (newTask: Task) => {
		const taskWithId = {
			...newTask,
			id: uuidv4(),
			title: newTask.title.toUpperCase(),
			description: newTask.description?.toUpperCase(),
		}

		setTasks([...tasks, taskWithId])
	}

	const toggleTaskCompletion = (taskId: string) => {
		setTasks(
			tasks.map((task) =>
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

	const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task) => task.id !== taskId))
	}

	return (
		<>
			<CustomSnackbar
				open={open}
				setOpen={setOpen}
				message={message}
				duration={0}
				type="warning"
			/>

			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Gestor de Tareas</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="md">
				<Box my={4} textAlign={'start'}>
					<TaskForm onAddTask={addTask} />
					<TaskList
						tasks={tasks}
						onToggleCompletion={toggleTaskCompletion}
						onDeleteTask={deleteTask}
					/>
				</Box>
			</Container>
		</>
	)
}
