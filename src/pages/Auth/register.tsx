import { useForm } from 'react-hook-form'
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { RegisterData } from '../../models/user'

interface RegisterProps {
	children: React.ReactNode
}

export const Register: React.FC<RegisterProps> = ({ children }) => {
	const { register, handleSubmit } = useForm()
	const { signup, error } = useAuth()

	const onSubmit = handleSubmit((data) => {
		const credentials = {
			email: data.email,
			password: data.password,
		} as RegisterData
		signup(credentials)
	})

	return (
		<Container
			maxWidth="xs"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 4,
					color: 'black',
					backgroundColor: 'white',
					borderRadius: '8px',
					boxShadow: 3,
				}}
			>
				<Typography
					component="h2"
					variant="h5"
					sx={{ marginBottom: 3 }}
				>
					Regístrate con tu nombre, correo y contraseña.
				</Typography>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						onSubmit(e).catch((error) => {
							console.error('Error submitting form:', error)
						})
					}}
					style={{ width: '100%' }}
				>
					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
					>
						<TextField
							type="email"
							id="email"
							label="Email"
							{...register('email', {
								required: 'Correo electrónico es requerido',
							})}
							placeholder="example@gmail.com"
							autoComplete="email"
							fullWidth
						/>

						<TextField
							id="password"
							label="Contraseña"
							{...register('password', {
								required: 'Contraseña es requerida',
								minLength: {
									value: 6,
									message:
										'La contraseña debe tener al menos 6 caracteres',
								},
							})}
							placeholder="Escribe tu contraseña"
							type="password"
							autoComplete="new-password"
							fullWidth
						/>
					</Box>

					<Button
						type="submit"
						variant="contained"
						size="large"
						sx={{
							marginTop: 3,
							backgroundColor: 'primary.main',
							color: 'white',
							'&:hover': {
								backgroundColor: 'secondary.main',
							},
						}}
						fullWidth
					>
						Registrarse
					</Button>

					{error && (
						<Typography
							color="error"
							variant="body2"
							align="center"
							sx={{ marginTop: 2 }}
						>
							{error}
						</Typography>
					)}
				</form>

				{children}
			</Box>
		</Container>
	)
}
