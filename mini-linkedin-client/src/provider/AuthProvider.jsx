import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name) => {
        setLoading(false);
        return updateProfile(auth.currentUser, {
            displayName: name,
        });
    }

    const logout = () => {
        setLoading(false);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe;
        }
    }, [])


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        login,
        updateUserProfile,
        logout,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;