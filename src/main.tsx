import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CustomTheme } from './theme/theme.tsx'
import { AppRoutes } from './config/routes.tsx'
import AuthProvider from './provider/AuthProvider.tsx'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<CustomTheme>
				<CssBaseline />
				<AppRoutes />
			</CustomTheme>
		</AuthProvider>
	</StrictMode>
)
