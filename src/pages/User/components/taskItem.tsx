import {
	ListItem,
	ListItemText,
	Checkbox,
	IconButton,
	Chip,
	Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import { Task } from '@/models/task'

interface TaskItemProps {
	task: Task
	onToggleCompletion: (taskId: string) => void
	onDeleteTask: (taskId: string) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onToggleCompletion,
	onDeleteTask,
}) => {
	const priorityColor: Record<
		string,
		'error' | 'warning' | 'success'
	> = {
		high: 'error',
		medium: 'warning',
		low: 'success',
	}

	return (
		<ListItem
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={() => onDeleteTask(task.id)}
				>
					<DeleteIcon />
				</IconButton>
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
								task.status === 'completed' ? 'line-through' : 'none',
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
			<Chip
				label={task.priority}
				color={priorityColor[task.priority]}
				size="small"
				style={{ marginLeft: 8 }}
			/>
		</ListItem>
	)
}
