import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
	label: string;
	divider?: string;
	content: string;
};

const LabeledItem = ({ label, divider = ':', content }: Props) => (
	<Box sx={{ display: 'flex', alignItems: 'center' }}>
		<Typography sx={{ color: grey[700], mr: 1 }}>
			{label}
			{divider}
		</Typography>
		<Typography sx={{ fontWeight: 500 }}>{content}</Typography>
	</Box>
);

export default LabeledItem;
