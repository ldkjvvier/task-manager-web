import { Login as LoginPage } from '../pages/Login/login'
import { User as UserPage } from '../pages/User/user'
import { ProtectedRoute } from '../pages/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const PublicRoutes = () => {
	return (
		<Routes>
			{/* RUTAS PUBLICAS */}
			<Route path="*" element={<LoginPage />} />
		</Routes>
	)
}
const UserRoutes = () => {
	return (
		<Routes>
			{/* RUTAS DEL USUARIO */}
			<Route
				path="/"
				element={
					<ProtectedRoute redirectTo="/">
						<UserPage />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<ProtectedRoute redirectTo="/" />} />
		</Routes>
	)
}

export const AppRoutes = () => {
	const { isAuthenticated } = useAuth()

	return (
		<BrowserRouter>
			{isAuthenticated ? <UserRoutes /> : <PublicRoutes />}
		</BrowserRouter>
	)
}
