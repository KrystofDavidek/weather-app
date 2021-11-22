import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import MyLocations from '../pages/MyLocations';
import NotFound from '../pages/NotFound';

const Paths = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/my-locations" element={<MyLocations />} />
		<Route path="/login" element={<Login />} />
		<Route element={<NotFound />} />
	</Routes>
);
export default Paths;
