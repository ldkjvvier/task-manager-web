import TaskProvider from '../../provider/TaskProvider'
import { TaskPage } from './components/task'

export const User = () => {
	return (
		<TaskProvider>
			<TaskPage />
		</TaskProvider>
	)
}
