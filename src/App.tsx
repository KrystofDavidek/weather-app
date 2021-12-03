import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Paths from './components/Paths';
import { SnackbarContextProvider } from './hooks/useSnackbarContext';
import { UserProvider } from './hooks/useUserContext';
import theme from './utils/theme';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<SnackbarContextProvider>
				<BrowserRouter>
					<CssBaseline />
					<Layout>
						<Paths />
					</Layout>
				</BrowserRouter>
			</SnackbarContextProvider>
		</ThemeProvider>
	</UserProvider>
);

export default App;
