import {
	createContext,
	FC,
	useCallback,
	useState,
	useMemo,
	useContext
} from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext<SnackbarContextType>(undefined as never);

type SnackbarContextType = {
	showSnackbar: (options: SnackbarOptions) => void;
};

type SnackbarOptions = {
	text: string;
	variant: 'error' | 'info' | 'success' | 'warning';
};

export const SnackbarContextProvider: FC = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<SnackbarOptions>({
		text: '',
		variant: 'info'
	});

	const showSnackbar = useCallback((options: SnackbarOptions) => {
		setOptions(options);
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => setOpen(false), []);

	const SnackbarCtx = useMemo(
		() => ({
			showSnackbar
		}),
		[showSnackbar]
	);

	return (
		<SnackbarContext.Provider value={SnackbarCtx}>
			{children}
			<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={options.variant}
					sx={{ width: '100%' }}
				>
					{options.text}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = () => useContext(SnackbarContext);
