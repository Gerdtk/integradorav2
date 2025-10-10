import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut } from 'firebase/auth';

    export const login = (email: string, pass: string)=>
        signInWithEmailAndPassword(auth, email, pass);
    export const register = (email: string, pass: string) =>
        createUserWithEmailAndPassword(auth, email, pass);
    export const logout = () => signOut(auth);
    