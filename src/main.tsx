import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomTheme } from './theme/theme.tsx'
import { AppRoutes } from './config/routes.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<CustomTheme>
			<AppRoutes />
		</CustomTheme>
	</StrictMode>
)
