import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NotFound = () => (
	<>
		<WarningIcon sx={{ typography: 'h1' }} />
		<Typography variant="h2">Error</Typography>
		<Typography>Page not found</Typography>
	</>
);

export default NotFound;
