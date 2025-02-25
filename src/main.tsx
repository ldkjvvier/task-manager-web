import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CustomTheme } from './theme/theme.tsx'
import { AppRoutes } from './config/routes.tsx'
import AuthProvider from './provider/AuthProvider.tsx'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<CustomTheme>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<CssBaseline />
					<AppRoutes />
				</LocalizationProvider>
			</CustomTheme>
		</AuthProvider>
	</StrictMode>
)
