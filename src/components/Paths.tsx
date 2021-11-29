import { Routes, Route } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';
import { Home, MyLocations, Login, Forecast, NotFound } from '../pages';
import Settings from '../pages/Settings';

const Paths = () => {
	const user = useUserContext();
	return (
		<Routes>
			<Route path="*" element={<Home />} />
			<Route path="/:paramLocation" element={<Home />} />
			<Route path="/my-locations" element={<MyLocations />} />
			{user ? (
				<Route path="/settings" element={<Settings />} />
			) : (
				<Route path="/login" element={<Login />} />
			)}
			<Route path="/forecast/:query" element={<Forecast />} />
			<Route element={<NotFound />} />
		</Routes>
	);
};

export default Paths;
