import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const firebaseAuthMessages = {
    "auth/email-already-in-use": "Email is already being used",
    "auth/invalid-credential": "Invalid credentials"
}

const authService = {
    signUp: (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    },

    signIn: (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    },

    signOut: (email, password) => {
        return signOut(auth)
    },

    getUser: async () => {
        await auth.authStateReady();

        let currentUser = auth.currentUser;
        return currentUser;
    },
    self: auth

}

export default authService;