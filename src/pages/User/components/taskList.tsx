import { List, Paper, Typography } from '@mui/material'
import { TaskItem } from './taskItem'
import { Task } from '../../../models/task'
import { Category, User } from '../../../models/user'

interface TaskListProps {
	tasks: Task[]
	category: Category[]
	user: User
	currentCategory: string
	onToggleCompletion: (taskId: string) => void
	onDeleteTask: (taskId: string) => void
	onUpdateTask: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	category,
	user,
	currentCategory,
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
					{tasks.map((task) => {
						if (currentCategory === 'default') {
							return (
								<TaskItem
									key={task.id}
									task={task}
									user={user}
									category={category}
									onToggleCompletion={onToggleCompletion}
									onDeleteTask={onDeleteTask}
									onUpdateTask={onUpdateTask}
								/>
							)
						}
						if (task.categoryId === currentCategory) {
							return (
								<TaskItem
									key={task.id}
									task={task}
									user={user}
									category={category}
									onToggleCompletion={onToggleCompletion}
									onDeleteTask={onDeleteTask}
									onUpdateTask={onUpdateTask}
								/>
							)
						}
					})}
				</List>
			</Paper>
		</>
	)
}

export default TaskList
