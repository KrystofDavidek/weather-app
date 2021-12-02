import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#4576E7', light: '#8F84F8', dark: '#096DD7' },
		secondary: { main: '#FF9F45', light: '#FFD031', dark: '#FF656F' }
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	}
});

export default theme;
