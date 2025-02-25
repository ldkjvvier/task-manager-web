import { useState } from 'react'
import { Login } from './login'
import { Register } from './register'
import { Typography } from '@mui/material'
interface AuthState {
	state: 'login' | 'register'
}
export const Auth = () => {
	const [authState, setAuthState] = useState<AuthState>({
		state: 'login',
	})

	if (authState.state === 'login') {
		return (
			<Login>
				<Typography
					variant="body2"
					align="center"
					sx={{ marginTop: 2 }}
				>
					¿No tienes cuenta?{' '}
					<a
						href="#"
						onClick={() => setAuthState({ state: 'register' })}
					>
						Regístrate
					</a>
				</Typography>
			</Login>
		)
	}
	if (authState.state === 'register') {
		return (
			<Register>
				<Typography
					variant="body2"
					align="center"
					sx={{ marginTop: 2 }}
				>
					¿Ya tienes cuenta?{' '}
					<a
						href="#"
						onClick={() => setAuthState({ state: 'login' })}
					>
						Inicia sesión
					</a>
				</Typography>
			</Register>
		)
	}
}
