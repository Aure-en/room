import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signInAnonymously = () => {
    return auth.signInAnonymously();
  };

  const signUpFromAnonymous = async (email, password) => {
    const credential = await firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return auth.currentUser.linkWithCredential(credential);
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signUp,
    signIn,
    signOut,
    signInAnonymously,
    signUpFromAnonymous,
    currentUser,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};