import * as React from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { Alert } from '@mui/material'

interface CustomSnackbarProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	message: string
	showButton?: boolean
	duration?: number
	type: 'success' | 'error' | 'warning' | 'info'
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
	open,
	setOpen,
	message,
	duration = 600,
	type = 'success',
}) => {
	const handleClose = (
		_event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<div>
			<Snackbar open={open} autoHideDuration={duration}>
				<Alert onClose={handleClose} severity={type}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}
