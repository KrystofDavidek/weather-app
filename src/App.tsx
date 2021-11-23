import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Paths from './components/Paths';

const App = () => (
	<BrowserRouter>
		<CssBaseline />
		<Layout>
			<Paths />
		</Layout>
	</BrowserRouter>
);

export default App;
