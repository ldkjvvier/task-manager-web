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
import { CustomSnackbar } from './components/SnackBar'
import { isTaskNearDueDate } from '../../helper/TaskNearDueDate'
import { useTask } from '../../hooks/useTask'

export const User = () => {
	const { tasks, addTask, removeTask, updateTask } = useTask()
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

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

	const handleAddTask = (newTask: Task) => {
		const taskWithId = {
			...newTask,
			id: '',
			title: newTask.title.toUpperCase(),
			description: newTask.description?.toUpperCase(),
		}

		addTask(taskWithId)
	}

	const handleToggleTaskCompletion = (taskId: string) => {
		const taskToUpdate = tasks.find((task) => task.id === taskId)
		if (taskToUpdate) {
			updateTask({
				...taskToUpdate,
				status:
					taskToUpdate.status === 'pending' ? 'completed' : 'pending',
			})
		}
	}

	const handleUpdateTask = (task: Task) => {
		updateTask(task)
	}

	const handleDeleteTask = (taskId: string) => {
		removeTask(taskId)
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
					<TaskForm onAddTask={handleAddTask} />
					<TaskList
						tasks={tasks}
						onToggleCompletion={handleToggleTaskCompletion}
						onDeleteTask={handleDeleteTask}
						onUpdateTask={handleUpdateTask}
					/>
				</Box>
			</Container>
		</>
	)
}
