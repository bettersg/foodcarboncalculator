/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { firebaseAuth, firebaseAuthGoogle, firebaseAuthFacebook } from '../common/firebaseConfig';

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [refreshed, setRefreshed] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrUser(user);
      setRefreshed(false);
    });
    return unsubscribe;
  }, []);

  function signup(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function loginWithGoogle() {
    return firebaseAuth.signInWithPopup(firebaseAuthGoogle);
    // signInWithRedirect might be better for mobile
  }

  function loginWithFacebook() {
    return firebaseAuth.signInWithPopup(firebaseAuthFacebook);
    // signInWithRedirect might be better for mobile
  }

  function logout() {
    return firebaseAuth.signOut();
  }

  const value = {
    currUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    refreshed,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
