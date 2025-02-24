import { List, Typography } from '@mui/material'
import { TaskItem } from './taskItem'
import { Task } from '@/models/task'

interface TaskListProps {
	tasks: Task[]
	onToggleCompletion: (taskId: string) => void
	onDeleteTask: (taskId: string) => void
}

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	onToggleCompletion,
	onDeleteTask,
}) => {
	return (
		<>
			<Typography variant="h5" component="h2" gutterBottom>
				Lista de Tareas
			</Typography>
			<List>
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						onToggleCompletion={onToggleCompletion}
						onDeleteTask={onDeleteTask}
					/>
				))}
			</List>
		</>
	)
}

export default TaskList
