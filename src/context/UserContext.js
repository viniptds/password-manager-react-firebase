import { createContext } from "react";
import authService from "../utils/firebaseAuth";

export const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,

    login: (email, password) => authService
        .signIn(email, password),
    logout: () => {
        return authService.signOut();
    }
}

const UserContext = createContext({
    ...initialState,
    method: 'firebase',
});

export default UserContext
