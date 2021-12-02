import { Grid, Typography } from '@mui/material';

type ItemProps = {
	Icon: JSX.Element;
	label: string;
	content: string;
};

export const WeatherInfoItem = ({ Icon, label, content }: ItemProps) => (
	<Grid container sx={{ borderTop: '1px solid lightgray', py: 1 }}>
		<Grid item sx={{ display: 'grid', placeItems: 'center', mr: 1 }}>
			{Icon}
		</Grid>
		<Grid item xs sx={{ fontWeight: 500 }}>
			{label}
		</Grid>
		<Grid item>
			<Typography>{content}</Typography>
		</Grid>
	</Grid>
);
