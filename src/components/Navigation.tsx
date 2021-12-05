import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import useUserContext from '../hooks/useUserContext';
import { signOut } from '../utils/firebase';

type Props = {
	onClick?: () => void;
};

const Navigation = ({ onClick }: Props) => {
	const { user, userData } = useUserContext();
	const navigate = useNavigate();

	const handleSignOut = useCallback(async () => {
		await signOut();
		navigate('/login');
		onClick?.();
	}, []);

	return (
		<>
			<Button
				component={Link}
				to="/search"
				sx={{ color: 'inherit', width: '10rem' }}
				onClick={onClick}
			>
				Find location
			</Button>
			{user && (
				<Button
					component={Link}
					to="/my-locations"
					sx={{ color: 'inherit', width: '10rem' }}
					onClick={onClick}
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
							sx={{ color: 'inherit' }}
							endIcon={<SettingsIcon />}
							onClick={onClick}
						>
							{userData.userName}
						</Button>
					) : (
						<IconButton
							component={Link}
							to="/settings"
							sx={{ color: 'inherit' }}
							onClick={onClick}
						>
							<SettingsIcon />
						</IconButton>
					)}
					<Button onClick={handleSignOut} sx={{ color: 'inherit' }}>
						Logout
					</Button>
				</>
			) : (
				<Button
					component={Link}
					to="/login"
					sx={{ color: 'inherit' }}
					onClick={onClick}
				>
					Login
				</Button>
			)}
		</>
	);
};

export default Navigation;
