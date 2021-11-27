import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
