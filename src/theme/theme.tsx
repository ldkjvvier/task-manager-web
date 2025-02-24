import { ThemeProvider, createTheme } from '@mui/material/styles'
import '../index.css'
export const CustomTheme = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const lightTheme = createTheme({
		palette: {
			mode: 'light',
		},
	})

	return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
}
