import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Paths from './components/Paths';
import { UserProvider } from './hooks/useUserContext';

const App = () => (
	<UserProvider>
		<BrowserRouter>
			<CssBaseline />
			<Layout>
				<Paths />
			</Layout>
		</BrowserRouter>
	</UserProvider>
);

export default App;
