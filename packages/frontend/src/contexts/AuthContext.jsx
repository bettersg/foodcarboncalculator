import React, { useContext, useState, useEffect } from 'react'
import { firebaseAuth } from '../common/firebaseConfig'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            setCurrUser(user);
        })
        return unsubscribe;
    }, [])

    function signup(email, password) {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return firebaseAuth.signOut();
    }

    const value = {
        currUser,
        signup,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
