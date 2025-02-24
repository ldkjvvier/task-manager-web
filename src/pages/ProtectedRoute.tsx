import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
	children?: React.ReactNode
	redirectTo: string
}

export const ProtectedRoute = ({
	children,
	redirectTo,
}: ProtectedRouteProps) => {
	const auth = useAuth()
	if (auth.isLoading) return <p>Cargando</p>
	if (!auth.isLoading && !auth.isAuthenticated) {
		return <Navigate to={redirectTo} />
	}

	return children ? children : <Outlet />
}
