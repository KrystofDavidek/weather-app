import { Link } from 'react-router-dom';
import { FC } from 'react';
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';

const Layout: FC = ({ children }) => (
	<>
		<AppBar position="fixed">
			<Container maxWidth="sm">
				<Toolbar disableGutters sx={{ gap: 2 }}>
					<Button component={Link} to="/" sx={{ color: 'white' }}>
						Find location
					</Button>
					<Button component={Link} to="/my-locations" sx={{ color: 'white' }}>
						My locations
					</Button>
					{/* Always login (without user) till the context is done */}
					<Box sx={{ flexGrow: 1 }} />
					<Button component={Link} to="/login" sx={{ color: 'white' }}>
						Login
					</Button>
				</Toolbar>
			</Container>
		</AppBar>

		{/* Main content container */}
		<Container
			maxWidth="sm"
			component="main"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				pt: 8,
				gap: 2
			}}
		>
			{children}
		</Container>
	</>
);
export default Layout;
