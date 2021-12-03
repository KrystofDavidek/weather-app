import { Link, useNavigate } from 'react-router-dom';
import { FC, useCallback } from 'react';
import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	IconButton,
	Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import useUserContext from '../hooks/useUserContext';
import { signOut } from '../utils/firebase';

const Layout: FC = ({ children }) => {
	const { user, userData } = useUserContext();
	const navigate = useNavigate();

	const handleSignOut = useCallback(async () => {
		await signOut();
		navigate('/login');
	}, []);

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
				<Container maxWidth="sm">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button component={Link} to="/" sx={{ color: 'white' }}>
							Find location
						</Button>
						{user && (
							<Button
								component={Link}
								to="/my-locations"
								sx={{ color: 'white' }}
							>
								My locations
							</Button>
						)}
						<Box sx={{ flexGrow: 1 }} />
						{user ? (
							<>
								<IconButton
									component={Link}
									to="/settings"
									sx={{ color: 'white' }}
								>
									{userData?.userName && (
										<Button sx={{ color: 'white' }}>
											{userData?.userName}
										</Button>
									)}
									<SettingsIcon />
								</IconButton>
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
