import {
	ListItem,
	Checkbox,
	IconButton,
	Chip,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	Box,
	Tooltip,
} from '@mui/material'
import { Delete, Edit, Label } from '@mui/icons-material'
import dayjs from 'dayjs'
import { Task } from '@/models/task'
import { useState } from 'react'
import { TaskEditForm } from './taskEditForm'
import { isTaskNearDueDate } from '../../../helper/TaskNearDueDate'

const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) return text
	return text.slice(0, maxLength) + '...'
}
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
	const [showFullDescription, setShowFullDescription] =
		useState(false)
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
				sx={{
					flexDirection: 'column',
					alignItems: 'flex-start',
					borderBottom: '1px solid',
					borderColor: 'divider',
					py: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'flex-start',
					}}
				>
					<Checkbox
						edge="start"
						checked={task.status === 'completed'}
						onChange={() => onToggleCompletion(task.id)}
					/>
					<Box
						sx={{
							flex: 1,
							minWidth: 0,
							mr: 2,
						}}
					>
						<Typography
							variant="subtitle1"
							component="div"
							sx={{
								textDecoration:
									task.status === 'completed'
										? 'line-through'
										: 'none',
								wordBreak: 'break-word',
							}}
						>
							{task.title}
						</Typography>

						{task.description && (
							<Tooltip
								title={
									showFullDescription
										? ''
										: 'Click para ver descripción completa'
								}
							>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										mt: 1,
										wordBreak: 'break-word',
										whiteSpace: 'pre-wrap',
										cursor: 'pointer',
									}}
									onClick={() =>
										setShowFullDescription(!showFullDescription)
									}
								>
									{showFullDescription
										? task.description
										: truncateText(task.description, 150)}
								</Typography>
							</Tooltip>
						)}

						<Box
							sx={{
								mt: 1,
								display: 'flex',
								gap: 1,
								flexWrap: 'wrap',
							}}
						>
							{task.dueDate && (
								<Typography variant="body2" color="text.secondary">
									Fecha límite:{' '}
									{dayjs(task.dueDate).format('DD/MM/YYYY')}
								</Typography>
							)}

							<Chip
								icon={<Label />}
								label={
									task.categoryId === 'none'
										? 'Sin categoría'
										: task.categoryId
								}
								size="small"
								color="default"
								variant="outlined"
							/>
						</Box>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexShrink: 0,
							gap: 1,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'end',
								gap: 1,
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
								/>
							)}
							<Chip
								label={task.priority}
								color={priorityColor[task.priority]}
								size="small"
							/>
						</Box>
						<IconButton
							aria-label="edit"
							onClick={handleEditClick}
							size="small"
						>
							<Edit />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => onDeleteTask(task.id)}
							size="small"
						>
							<Delete />
						</IconButton>
					</Box>
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
