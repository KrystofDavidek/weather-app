import { Routes, Route } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';
import {
	Search,
	MyLocations,
	Login,
	Forecast,
	NotFound,
	Settings,
	Welcome
} from '../pages';

const Paths = () => {
	const { user } = useUserContext();

	return (
		<Routes>
			<Route path="/search" element={<Search />} />
			<Route path="/search/:paramLocation" element={<Search />} />
			{user ? (
				<>
					<Route path="/my-locations" element={<MyLocations />} />
					<Route path="/settings" element={<Settings />} />
				</>
			) : (
				<Route path="/login" element={<Login />} />
			)}
			<Route path="/forecast/:query" element={<Forecast />} />
			<Route path="/" element={<Welcome />} />
			<Route element={<NotFound />} />
		</Routes>
	);
};

export default Paths;
