'use client'

import { useState } from 'react'
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	SelectChangeEvent,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Task } from '../../../models/task'
import dayjs, { Dayjs } from 'dayjs'
import { User } from '../../../models/user'

interface TaskFormProps {
	onAddTask: (task: Task) => void
	user: User
}

export const TaskForm: React.FC<TaskFormProps> = ({
	onAddTask,
	user,
}) => {
	const [task, setTask] = useState<Task>({
		id: '',
		title: '',
		description: '',
		dueDate: null,
		status: 'pending',
		priority: 'medium',
		userId: user.id,
		categoryId: null,
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
	) => {
		const { name, value } = e.target
		if (name) {
			setTask((prevTask) => ({ ...prevTask, [name]: value }))
		}
	}

	const handleDateChange = (date: Dayjs | null) => {
		setTask((prevTask) => ({
			...prevTask,
			dueDate: date ? date.toDate() : null,
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (task.title.trim()) {
			onAddTask({ ...task, id: Date.now().toString() })
			setTask({
				id: '',
				title: '',
				description: '',
				dueDate: null,
				status: 'pending',
				priority: 'medium',
				userId: user.id,
				categoryId: null,
			})
		}
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			noValidate
			sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}
		>
			<TextField
				margin="normal"
				required
				fullWidth
				id="title"
				label="Título"
				name="title"
				value={task.title}
				onChange={
					handleChange as React.ChangeEventHandler<HTMLInputElement>
				}
			/>
			<TextField
				margin="normal"
				fullWidth
				id="description"
				label="Descripción"
				name="description"
				multiline
				rows={4}
				value={task.description}
				onChange={
					handleChange as React.ChangeEventHandler<HTMLInputElement>
				}
			/>
			<DatePicker
				label="Fecha límite"
				value={task.dueDate ? dayjs(task.dueDate) : null}
				minDate={dayjs()}
				onChange={handleDateChange}
				sx={{
					width: '50%',
				}}
			/>
			<FormControl fullWidth margin="normal">
				<InputLabel id="category-label">Categoría</InputLabel>
				<Select
					labelId="category-label"
					id="category"
					name="categoryId"
					value={task.categoryId || ''}
					label="Categoría"
					onChange={handleChange}
				>
					{user.categories.length === 0 && (
						<MenuItem value="" disabled>
							No hay categorías
						</MenuItem>
					)}
					{user.categories.map((category) => (
						<MenuItem key={category.id} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth margin="normal">
				<InputLabel id="priority-label">Prioridad</InputLabel>
				<Select
					labelId="priority-label"
					id="priority"
					name="priority"
					value={task.priority}
					label="Prioridad"
					onChange={handleChange}
				>
					<MenuItem value="high">Alta</MenuItem>
					<MenuItem value="medium">Media</MenuItem>
					<MenuItem value="low">Baja</MenuItem>
				</Select>
			</FormControl>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Agregar Tarea
			</Button>
		</Box>
	)
}
