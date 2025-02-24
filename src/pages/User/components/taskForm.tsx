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
import { Task } from '@/models/task'
import dayjs, { Dayjs } from 'dayjs'

interface TaskFormProps {
	onAddTask: (task: Task) => void
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
	const [task, setTask] = useState<Task>({
		id: '',
		title: '',
		description: '',
		dueDate: null,
		status: 'pending',
		priority: 'medium',
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
			})
		}
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			noValidate
			sx={{ mt: 1 }}
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
				onChange={handleDateChange}
			/>
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
