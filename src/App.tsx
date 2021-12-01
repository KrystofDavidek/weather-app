import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Paths from './components/Paths';
import { SnackbarContextProvider } from './hooks/useSnackbarContext';
import { UserProvider } from './hooks/useUserContext';

const App = () => (
	<UserProvider>
		<SnackbarContextProvider>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<Paths />
				</Layout>
			</BrowserRouter>
		</SnackbarContextProvider>
	</UserProvider>
);

export default App;
