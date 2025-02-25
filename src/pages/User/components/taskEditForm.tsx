'use client'

import React, { useState } from 'react'
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Stack,
	SelectChangeEvent,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Task } from '../../../models/task'
import { User } from '../../../models/user'

interface TaskEditFormProps {
	task: Task
	user: User
	onSubmit: (task: Task) => void
	onCancel: () => void
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
	task,
	user,
	onSubmit,
	onCancel,
}) => {
	const [editedTask, setEditedTask] = useState({
		id: task.id,
		title: task.title,
		description: task.description,
		dueDate: task.dueDate ? dayjs(task.dueDate) : null,
		priority: task.priority,
		status: task.status,
		userId: task.userId,
		categoryId: task.categoryId,
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
	) => {
		const { name, value } = e.target
		if (name) {
			setEditedTask((prevTask) => ({ ...prevTask, [name]: value }))
		}
	}

	const handleDateChange = (date: Dayjs | null) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			dueDate: date,
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (editedTask.title.trim()) {
			onSubmit({
				...editedTask,
				dueDate: editedTask.dueDate
					? editedTask.dueDate.toDate()
					: null,
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
				value={editedTask.title}
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
				value={editedTask.description}
				onChange={
					handleChange as React.ChangeEventHandler<HTMLInputElement>
				}
			/>
			<DatePicker
				label="Fecha límite"
				value={editedTask.dueDate}
				onChange={handleDateChange}
			/>
			<FormControl fullWidth margin="normal">
				<InputLabel id="category-label">Categoría</InputLabel>
				<Select
					labelId="category-label"
					id="category"
					name="categoryId"
					value={editedTask.categoryId || ''}
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
					value={editedTask.priority}
					label="Prioridad"
					onChange={handleChange}
				>
					<MenuItem value="high">Alta</MenuItem>
					<MenuItem value="medium">Media</MenuItem>
					<MenuItem value="low">Baja</MenuItem>
				</Select>
			</FormControl>
			<Stack direction="row" spacing={2} sx={{ mt: 3, mb: 2 }}>
				<Button type="submit" variant="contained" fullWidth>
					Guardar Cambios
				</Button>
				<Button variant="outlined" fullWidth onClick={onCancel}>
					Cancelar
				</Button>
			</Stack>
		</Box>
	)
}
