import { Task } from '@/models/task'
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Box,
	Tabs,
	Tab,
	IconButton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { TaskForm } from './components/taskForm'
import TaskList from './components/taskList'
import { CustomSnackbar } from './components/SnackBar'
import { isTaskNearDueDate } from '../../helper/TaskNearDueDate'
import { useTask } from '../../hooks/useTask'
import { Add } from '@mui/icons-material'
export const User = () => {
	const { tasks, addTask, removeTask, updateTask } = useTask()
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

	const [currentCategory, setCurrentCategory] = useState('todas')
	const [categories, setCategories] = useState([
		'trabajo',
		'personal',
		'compras',
	])
	const [isAddingCategory, setIsAddingCategory] = useState(false)
	const [newCategory, setNewCategory] = useState('')

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

					<Box
						sx={{
							borderBottom: 1,
							borderColor: 'divider',
							mt: 4,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Tabs
							value={currentCategory}
							onChange={(_, newValue) => setCurrentCategory(newValue)}
							variant="scrollable"
							scrollButtons="auto"
						>
							<Tab label="Todas" value="todas" />
							{categories.map((category) => (
								<Tab
									key={category}
									label={
										category.charAt(0).toUpperCase() +
										category.slice(1)
									}
									value={category}
								/>
							))}
						</Tabs>
						<IconButton
							size="small"
							onClick={() => setIsAddingCategory(true)}
							sx={{ ml: 1 }}
						>
							<Add />
						</IconButton>
					</Box>

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
