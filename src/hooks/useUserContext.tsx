import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

import { onAuthChanged, UserData, userDataDocument } from '../utils/firebase';

type UserContextType = { user?: User; userData?: UserData };

const UserContext = createContext<UserContextType>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User>();
	const [userData, setUserData] = useState<UserData>();

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	useEffect(() => {
		if (!user?.email) {
			return;
		}
		const unsubscribe = onSnapshot(userDataDocument(user.email), snapshot => {
			setUserData(snapshot.data());
		});

		return () => {
			unsubscribe();
		};
	}, [user?.email]);

	return (
		<UserContext.Provider value={{ user, userData }}>
			{children}
		</UserContext.Provider>
	);
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
