import { Routes, Route } from 'react-router-dom';

import { Home, MyLocations, Login, Forecast, NotFound } from '../pages';

const Paths = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/my-locations" element={<MyLocations />} />
		<Route path="/login" element={<Login />} />
		<Route path="/forecast/:query" element={<Forecast />} />
		<Route element={<NotFound />} />
	</Routes>
);
export default Paths;
