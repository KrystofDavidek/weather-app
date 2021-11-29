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
	CollectionReference,
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

export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

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
	locations: [];
	degreesUnit: string;
	speedUnit: string;
};

export const userDataCollection = collection(
	db,
	'userData'
) as CollectionReference<UserData>;
