import { Button, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { arrayRemove, updateDoc } from 'firebase/firestore';

import { DialogPropsType } from '../../hooks/useDialogContext';
import { useSnackbar } from '../../hooks/useSnackbarContext';
import useUserContext from '../../hooks/useUserContext';
import { userDataDocument } from '../../utils/firebase';

type Props = DialogPropsType<{
	location: string;
}>;

export const DeleteLocationDialog = ({ location, close }: Props) => {
	const { user } = useUserContext();
	const { showSnackbar } = useSnackbar();

	const deleteLocation = async () => {
		if (!user?.email) {
			showSnackbar({
				text: 'User session lost',
				variant: 'error'
			});
			return;
		}
		await updateDoc(userDataDocument(user.email), {
			locations: arrayRemove(location)
		});
		showSnackbar({
			text: 'Locations removed',
			variant: 'success'
		});
	};

	const handleDelete = () => {
		deleteLocation();
		close();
	};

	return (
		<>
			<DialogTitle>Delete favorite locaiton</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete{' '}
					<Typography component="span" sx={{ fontWeight: 500 }}>
						{location}
					</Typography>{' '}
					from your locations?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDelete}>Yes</Button>
				<Button onClick={close}>No</Button>
			</DialogActions>
		</>
	);
};
