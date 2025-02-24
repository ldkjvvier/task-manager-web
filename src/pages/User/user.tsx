import { Task } from '@/models/task'
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Box,
} from '@mui/material'
import { useState } from 'react'
import { TaskForm } from './components/taskForm'
import TaskList from './components/taskList'
import { v4 as uuidv4 } from 'uuid'
export const User = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	console.log(tasks)

	const addTask = (newTask: Task) => {
		setTasks([
			...tasks,
			{ ...newTask, id: uuidv4(), status: 'pending' },
		])
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
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Gestor de Tareas</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="md">
				<Box my={4}>
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
