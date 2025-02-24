import dayjs from 'dayjs'

export const isTaskNearDueDate = (dueDate: Date | null): boolean => {
	if (!dueDate) return false

	const daysLeft = dayjs(dueDate).diff(dayjs(), 'day')
	return daysLeft >= 0 && daysLeft <= 2
}
