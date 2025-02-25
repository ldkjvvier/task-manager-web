import {
	ListItem,
	ListItemText,
	Checkbox,
	IconButton,
	Chip,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	Box,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import dayjs from 'dayjs'
import { Task } from '@/models/task'
import { useState } from 'react'
import { TaskEditForm } from './taskEditForm'
import { isTaskNearDueDate } from '../../../helper/TaskNearDueDate'
interface TaskItemProps {
	task: Task
	onToggleCompletion: (taskId: string) => void
	onDeleteTask: (taskId: string) => void
	onUpdateTask: (task: Task) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onToggleCompletion,
	onDeleteTask,
	onUpdateTask,
}) => {
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const priorityColor: Record<
		string,
		'error' | 'warning' | 'success'
	> = {
		high: 'error',
		medium: 'warning',
		low: 'success',
	}

	const handleEditClick = () => {
		setEditDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setEditDialogOpen(false)
	}

	const handleUpdate = (updatedTask: Task) => {
		onUpdateTask(updatedTask)
		setEditDialogOpen(false)
	}
	const daysUntilDue = dayjs(task.dueDate).diff(dayjs(), 'day')
	return (
		<>
			<ListItem
				secondaryAction={
					<>
						<IconButton
							edge="end"
							aria-label="edit"
							onClick={handleEditClick}
							sx={{ mr: 1 }}
						>
							<Edit />
						</IconButton>
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={() => onDeleteTask(task.id)}
						>
							<Delete />
						</IconButton>
					</>
				}
			>
				<Checkbox
					edge="start"
					checked={task.status === 'completed'}
					onChange={() => onToggleCompletion(task.id)}
				/>
				<ListItemText
					primary={
						<Typography
							component="span"
							style={{
								textDecoration:
									task.status === 'completed'
										? 'line-through'
										: 'none',
							}}
						>
							{task.title}
						</Typography>
					}
					secondary={
						<>
							<Typography
								component="span"
								variant="body2"
								color="text.primary"
							>
								{task.description}
							</Typography>
							{task.dueDate && (
								<Typography component="span" variant="body2">
									{' — '}Fecha límite:{' '}
									{dayjs(task.dueDate).format('DD/MM/YYYY')}
								</Typography>
							)}
						</>
					}
				/>
				<Box
					sx={{
						mr: 7,
					}}
				>
					{isTaskNearDueDate(task.dueDate) && (
						<Chip
							label={
								daysUntilDue === 0
									? 'Vence hoy'
									: `Vence en ${daysUntilDue} día${
											daysUntilDue > 1 ? 's' : ''
									  }`
							}
							color="warning"
							size="small"
							style={{ marginLeft: 8 }}
						/>
					)}
					<Chip
						label={task.priority}
						color={priorityColor[task.priority]}
						size="small"
						style={{ marginLeft: 8 }}
					/>
				</Box>
			</ListItem>

			<Dialog
				open={editDialogOpen}
				onClose={handleCloseDialog}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Editar Tarea</DialogTitle>
				<DialogContent>
					<TaskEditForm
						task={task}
						onSubmit={handleUpdate}
						onCancel={handleCloseDialog}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}
