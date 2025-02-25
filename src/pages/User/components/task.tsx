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
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { TaskForm } from '../components/taskForm'
import TaskList from '../components/taskList'
import { CustomSnackbar } from '../components/SnackBar'
import { isTaskNearDueDate } from '../../../helper/TaskNearDueDate'
import { useTask } from '../../../hooks/useTask'
import { Add } from '@mui/icons-material'
import { useAuth } from '../../../hooks/useAuth'

export const TaskPage = () => {
	const { tasks, addTask, removeTask, updateTask } = useTask()
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const { user } = useAuth()
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

	const handleAddCategory = () => {
		if (
			newCategory.trim() &&
			!categories.includes(newCategory.trim().toLowerCase())
		) {
			setCategories([...categories, newCategory.trim().toLowerCase()])
			setNewCategory('')
			setIsAddingCategory(false)
		}
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
					<TaskForm onAddTask={handleAddTask} user={user} />

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
							{user.categories.map((category) => (
								<Tab
									key={category.id}
									label={category.name}
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
			<Dialog
				open={isAddingCategory}
				onClose={() => setIsAddingCategory(false)}
			>
				<DialogTitle>Agregar Nueva Categoría</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Nombre de la categoría"
						fullWidth
						variant="outlined"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsAddingCategory(false)}>
						Cancelar
					</Button>
					<Button onClick={handleAddCategory}>Agregar</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
