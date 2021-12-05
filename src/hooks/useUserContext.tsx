import {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { User } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

import { onAuthChanged, UserData, userDataDocument } from '../utils/firebase';

type UserContextType = { user?: User; userData?: UserData; loading: boolean };

const UserContext = createContext<UserContextType>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User>();
	const [userData, setUserData] = useState<UserData>();

	useEffect(() => {
		onAuthChanged(u => {
			setUser(u ?? undefined);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (!user?.email) {
			setUserData(undefined);
			return;
		}
		const unsubscribe = onSnapshot(userDataDocument(user.email), snapshot => {
			setUserData(snapshot.data());
		});

		return () => {
			unsubscribe();
		};
	}, [user?.email]);

	const UserCtx = useMemo(
		() => ({
			user,
			userData,
			loading
		}),
		[user, userData, loading]
	);

	return (
		<UserContext.Provider value={UserCtx}>{children}</UserContext.Provider>
	);
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
