import { Link, useNavigate } from 'react-router-dom';
import { FC, useCallback } from 'react';
import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	IconButton,
	Typography,
	CircularProgress
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import logo from '../assets/images/logo.png';
import useUserContext from '../hooks/useUserContext';
import { signOut } from '../utils/firebase';

const Layout: FC = ({ children }) => {
	const { user, loading, userData } = useUserContext();
	const navigate = useNavigate();

	const handleSignOut = useCallback(async () => {
		await signOut();
		navigate('/login');
	}, []);

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
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button component={Link} to="/">
							<img src={logo} alt="logo" height="40" width="40" />
						</Button>
						<Button
							component={Link}
							to="/search"
							sx={{ color: 'white', width: '10rem' }}
						>
							Find location
						</Button>
						{user && (
							<Button
								component={Link}
								to="/my-locations"
								sx={{ color: 'white', width: '10rem' }}
							>
								My locations
							</Button>
						)}
						<Box sx={{ flexGrow: 1 }} />
						{user ? (
							<>
								{userData?.userName ? (
									<Button
										component={Link}
										to="/settings"
										sx={{ color: 'white' }}
										endIcon={<SettingsIcon />}
									>
										{userData.userName}
									</Button>
								) : (
									<IconButton
										component={Link}
										to="/settings"
										sx={{ color: 'white' }}
									>
										<SettingsIcon />
									</IconButton>
								)}
								<Button onClick={handleSignOut} sx={{ color: 'white' }}>
									Logout
								</Button>
							</>
						) : (
							<Button component={Link} to="/login" sx={{ color: 'white' }}>
								Login
							</Button>
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
