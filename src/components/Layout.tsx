import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Container,
	Toolbar,
	Box,
	IconButton,
	Typography,
	CircularProgress,
	Button,
	Drawer,
	useTheme,
	useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../assets/images/logo.png';
import useUserContext from '../hooks/useUserContext';

import Navigation from './Navigation';

const Layout: FC = ({ children }) => {
	const { loading } = useUserContext();
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const isSM = useMediaQuery(theme.breakpoints.down('sm'));

	const handleOpen = useCallback(() => setOpen(true), []);
	const handleClose = useCallback(() => setOpen(false), []);

	if (loading) {
		return (
			<Box
				sx={{
					height: '100vh',
					width: '100vw',
					display: 'grid',
					placeItems: 'center'
				}}
			>
				<CircularProgress size={75} />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<AppBar
				position="fixed"
				sx={{
					background: 'linear-gradient(to right, #096DD7, #5779EC, #8F84F8)'
				}}
			>
				<Container>
					<Toolbar disableGutters sx={{ gap: 2, color: 'white' }}>
						<Button component={Link} to="/">
							<img src={logo} alt="logo" height="40" width="40" />
						</Button>
						{isSM ? (
							<>
								<IconButton
									sx={{ ml: 'auto', color: 'inherit' }}
									onClick={handleOpen}
								>
									<MenuIcon />
								</IconButton>
								<Drawer open={open} anchor="right" onClose={handleClose}>
									<Box
										sx={{
											color: 'primary.main',
											display: 'flex',
											flexDirection: 'column',
											height: '100%',
											py: 1
										}}
									>
										<Navigation onClick={handleClose} />
									</Box>
								</Drawer>
							</>
						) : (
							<Navigation />
						)}
					</Toolbar>
				</Container>
			</AppBar>
			{/* Main content container */}
			<Container
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					mt: '5rem',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
			<Typography component="div" sx={{ mt: 'auto', ml: 1 }}>
				Powered by{' '}
				<a href="https://www.weatherapi.com/" title="Free Weather API">
					WeatherAPI.com
				</a>
			</Typography>
		</Box>
	);
};

export default Layout;
