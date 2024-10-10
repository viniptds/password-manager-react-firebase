import { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import authService from "./utils/firebaseAuth";

import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Welcome } from './pages/Welcome';
import { Passwords } from './pages/Passwords';
import { CreatePassword } from './pages/CreatePassword';

import UserContext, { initialState } from './context/UserContext';
import Loading from './components/Loading';
import { MyAccount } from './pages/MyAccount';

const reducer = (state, action) => {
  if (action.type == 'INITIALISE') {

    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    authService.self.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: true, user }
        })
      } else {
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: false, user: null }
        });
      }

    })

  }, [dispatch]);


  return (state.isInitialized ?
    <UserContext.Provider value={{ ...state }}>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </UserContext.Provider>
    : <Loading />
  );
}

export default App;
