import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CustomTheme } from './theme/theme.tsx'
import { AppRoutes } from './config/routes.tsx'
import AuthProvider from './provider/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<CustomTheme>
				<AppRoutes />
			</CustomTheme>
		</AuthProvider>
	</StrictMode>
)
