import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import PageTitle from '../components/PageTitle';
import useWindowSize, { Size } from '../hooks/useWindowSize';

const Welcome = () => {
	const size: Size = useWindowSize();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					position: 'relative'
				}}
			>
				<Box sx={{ opacity: '11%' }}>
					<img
						src={logo}
						alt="Main logo"
						height={size.width < 750 ? size.width - 50 : 700}
						width={size.width < 750 ? size.width - 50 : 700}
					/>
				</Box>
				<Box
					sx={{
						position: 'absolute',
						top: '0',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<PageTitle title="Welcome to Weather App" />
					<Typography sx={{ fontSize: 26, mb: '1.5rem', mt: '5rem' }}>
						This application serves as any other weather information service.
					</Typography>
					<Typography sx={{ fontSize: 26, mb: '1.5rem' }}>
						Based on your location, it presents the current weather along with
						other information such as humidity or wind speed.
					</Typography>
					<Typography sx={{ fontSize: 26, mb: '1.5rem' }}>
						The logged-in user can save the locations and later return to them
						or share them.
					</Typography>
					<Button
						variant="contained"
						component={Link}
						to="/"
						sx={{
							mt: '3rem',
							alignSelf: 'center',
							background: 'linear-gradient(to right, #096DD7, #5779EC, #8F84F8)'
						}}
					>
						Let&#39;s try
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Welcome;
