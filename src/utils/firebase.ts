import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';

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

export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);
