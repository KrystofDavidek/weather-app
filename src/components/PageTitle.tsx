import { Typography } from '@mui/material';

type Props = {
	title: string;
};

const PageTitle = ({ title }: Props) => (
	<Typography
		variant="h1"
		sx={{ fontSize: 42, fontWeight: 500 }}
		color="primary.main"
	>
		{title}
	</Typography>
);

export default PageTitle;
