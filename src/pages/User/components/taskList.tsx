import { List, Paper, Typography } from '@mui/material'
import { TaskItem } from './taskItem'
import { Task } from '@/models/task'

interface TaskListProps {
	tasks: Task[]
	onToggleCompletion: (taskId: string) => void
	onDeleteTask: (taskId: string) => void
	onUpdateTask: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	onToggleCompletion,
	onDeleteTask,
	onUpdateTask,
}) => {
	return (
		<>
			<Typography variant="h5" component="h2" gutterBottom mt={2}>
				Lista de Tareas
			</Typography>
			<Paper>
				<List disablePadding>
					{tasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							onToggleCompletion={onToggleCompletion}
							onDeleteTask={onDeleteTask}
							onUpdateTask={onUpdateTask}
						/>
					))}
				</List>
			</Paper>
		</>
	)
}

export default TaskList
