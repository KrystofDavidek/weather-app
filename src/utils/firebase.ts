import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	doc,
	setDoc,
	CollectionReference,
	DocumentReference,
	getFirestore
} from 'firebase/firestore';

initializeApp({
	apiKey: 'AIzaSyDhn5WXyYywLc4-6aJCIQjBzZNda_TMRpg',
	authDomain: 'weather-app-6a224.firebaseapp.com',
	projectId: 'weather-app-6a224',
	storageBucket: 'weather-app-6a224.appspot.com',
	messagingSenderId: '763671122558',
	appId: '1:763671122558:web:a2b644d4e3864a32d2fe2f',
	measurementId: 'G-448N9YL46H'
});

// Authentication
const auth = getAuth();

export const signUp = async (email: string, password: string) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	if (!user.email) {
		return;
	}
	await setDoc(userDataDocument(user.email), {
		userEmail: user.email,
		locations: [],
		degreesUnit: 'celsius',
		speedUnit: 'kilometers'
	});
};

export const logIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore database
const db = getFirestore();

export type UserData = {
	userEmail: string;
	userName?: string;
	locations: string[];
	degreesUnit: 'celsius' | 'fahrenheit';
	speedUnit: 'kilometers' | 'miles';
};

export const userDataCollection = collection(
	db,
	'userData'
) as CollectionReference<UserData>;

export const userDataDocument = (email: string) =>
	doc(db, 'userData', email) as DocumentReference<UserData>;
