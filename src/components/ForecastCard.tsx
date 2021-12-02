import { Paper, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

import { ForecastHour } from '../models/forecast';

type Props = {
	data: ForecastHour;
};

const ForecastCard = ({ data }: Props) => (
	<Paper sx={{ p: 0.75, pl: 3, mt: 1.25 }} variant="outlined" elevation={0}>
		<Grid alignItems="center" container>
			<Grid item xs={6} sm={4} md={2}>
				{format(new Date(data.time), 'HH:mm')}
			</Grid>
			<Grid item xs={6} sm={4} md={2}>
				<Typography sx={{ fontWeight: 500, fontSize: 24 }}>
					{data.temp_c}°
				</Typography>
			</Grid>
			<Grid item xs={6} sm={4} md={4}>
				<Grid container alignItems="center" gap={1} wrap="nowrap">
					<Grid item sx={{ display: 'grid', placeItems: 'center' }}>
						<img
							style={{ height: 42, width: 'auto' }}
							src={data.condition.icon}
							alt="condition icon"
						/>
					</Grid>
					<Grid
						item
						sx={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap'
						}}
					>
						{data.condition.text}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} sm={4} md={2}>
				{data.humidity}%
			</Grid>
			<Grid item xs={6} sm={4} md={1}>
				{data.wind_dir}
			</Grid>
			<Grid item xs={6} sm={4} md={1}>
				{data.wind_kph} kph
			</Grid>
		</Grid>
	</Paper>
);

export default ForecastCard;
