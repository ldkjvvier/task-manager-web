import { useForm } from 'react-hook-form'
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

export const Login = () => {
	const { register, handleSubmit } = useForm()
	const { signin, error } = useAuth()

	const onSubmit = handleSubmit((data) => {
		const credentials = {
			email: data.email as string,
			password: data.password as string,
		}
		signin(credentials)
	})

	return (
		<Container
			maxWidth="xs"
			sx={{
				display: 'grid',
				placeItems: 'center',
				height: '100dvh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 4,
					color: 'var(--text-primary)',
					backgroundColor: 'var(--background-secondary)',
					borderRadius: '8px',
				}}
			>
				<Box>
					<Typography component="h2" variant="h5">
						Ingresa tu correo electrónico y contraseña para acceder.
					</Typography>
				</Box>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						onSubmit(e).catch((error) => {
							console.error('Error submitting form:', error)
						})
					}}
					className="flex flex-col w-full text-left mt-8"
				>
					<div className="flex flex-col gap-8">
						<TextField
							type="email"
							id="email"
							label="Email"
							{...register('email', {
								required: 'Correo electrónico es requerido',
							})}
							placeholder="example@gmail.com"
							autoComplete="email"
						/>

						<TextField
							id="password"
							label="Password"
							{...register('password', {
								required: 'Contraseña es requerida',
							})}
							placeholder="Escribe tu contraseña"
							type={'password'}
							autoComplete="current-password"
						/>
					</div>

					<Button
						type="submit"
						variant="contained"
						size="medium"
						sx={{
							marginTop: '4rem',
							backgroundColor: 'white',
							color: 'var(--color-primary)',
							'&:hover': {
								backgroundColor: 'var(--color-secondary)',
							},
						}}
					>
						Iniciar Sesión
					</Button>

					<p className="text-red-500 mt-4 text-center">
						{error || ''}
					</p>
				</form>
			</Box>
		</Container>
	)
}
