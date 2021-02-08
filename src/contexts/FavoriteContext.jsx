import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import { firestore } from "../firebase/firebase";
import { useAuth } from "./AuthContext";

const FavoriteContext = React.createContext();

export function useFavorite() {
  return useContext(FavoriteContext);
}

export function FavoriteProvider({ children }) {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Get a user's saved items
  const getFavorites = async (userId) => {
    const items = await firestore.collection("favorites").doc(userId).get();
    return items.data();
  };

  // Add favorite
  const addFavorite = (userId, id) => {
    return firestore
      .collection("favorites")
      .doc(userId)
      .set(
        {
          [id]: true,
        },
        { merge: true }
      );
  };

  // Delete favorite
  const deleteFavoriteList = (userId) => {
    return firestore.collection("favorites").doc(userId).delete();
  };

  const deleteFavorite = async (userId, id) => {
    await firestore
      .collection("favorites")
      .doc(userId)
      .update({
        [id]: firebase.firestore.FieldValue.delete(),
      });

    const favorites = await getFavorites(userId);
    if (Object.keys(favorites).length === 0) {
      deleteFavoriteList(userId);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = firestore
      .collection("favorites")
      .doc(currentUser.uid)
      .onSnapshot(async () => {
        const favoritesArray = [];
        const favorites = await getFavorites(currentUser.uid);
        if (!favorites) return;
        for (const favorite of Object.keys(favorites)) {
          favoritesArray.push(favorite);
        }
        setFavorites(favoritesArray);
      });
    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) setFavorites([]);
  }, [currentUser]);

  const value = {
    addFavorite,
    deleteFavorite,
    favorites,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

FavoriteProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
