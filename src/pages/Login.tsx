import {
	Button,
	Card,
	Divider,
	Grid,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { useSnackbar } from '../hooks/useSnackbarContext';
import { logIn, signUp } from '../utils/firebase';

const Login = () => {
	const navigate = useNavigate();
	const { showSnackbar } = useSnackbar();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isLogin, setLogin] = useState(true);

	const handleError = useCallback((text: string) => {
		showSnackbar({ text, variant: 'error' });
	}, []);

	const toggleLogin = () => setLogin(value => !value);

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: '50vh' }}
		>
			<Grid item sx={{ minWidth: '40vh' }}>
				<Card
					component="form"
					variant="outlined"
					onSubmit={async (e: FormEvent) => {
						e.preventDefault();
						try {
							isLogin
								? await logIn(email, password)
								: await signUp(email, password);
							showSnackbar({ text: `Welcome, ${email}`, variant: 'success' });
							navigate('/');
						} catch (error) {
							handleError(
								(error as { message?: string })?.message ?? 'Unknown error'
							);
						}
					}}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						pt: 4,
						px: 4,
						gap: 2
					}}
				>
					<Typography variant="h4" component="h2" textAlign="center" mb={3}>
						{isLogin ? 'Log In' : 'Sign Up'}
					</Typography>

					<TextField
						label="E-mail"
						id="email"
						value={email}
						onChange={useCallback(
							(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
								setEmail(e.target.value),
							[]
						)}
						type="email"
					/>
					<TextField
						label="Password"
						id="password"
						value={password}
						onChange={useCallback(
							(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
								setPassword(e.target.value),
							[]
						)}
						type="password"
					/>

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							alignSelf: 'center',
							gap: 2,
							m: 2
						}}
					>
						<Button type="submit" variant="outlined">
							{isLogin ? 'Log In' : 'Sign Up'}
						</Button>
					</Box>
					<Divider />

					{/* Log In/Sign up switch */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignSelf: 'center',
							alignItems: 'center',
							textAlign: 'center',
							mt: 2,
							gap: 4
						}}
					>
						<Typography variant="subtitle1" mb={3}>
							{isLogin
								? `Don't have an account yet?`
								: 'Already have an account?'}
						</Typography>
						<Button variant="contained" onClick={toggleLogin} sx={{ mb: 3 }}>
							{isLogin ? 'Sign Up' : 'Log In'}
						</Button>
					</Box>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Login;
