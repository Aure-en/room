import React, { useContext, useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { useAuth } from './AuthContext';
import firebase from 'firebase';

const FavoriteContext = React.createContext();

export function useFavorite() {
  return useContext(FavoriteContext);
}

export function FavoriteProvider({ children }) {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Get a user's saved items
  const getFavorites = async (userId) => {
    const items = await firestore.collection('favorites').doc(userId).get();
    return items.data();
  };

  // Add favorite
  const addFavorite = (userId, id) => {
    return firestore
      .collection('favorites')
      .doc(userId)
      .set(
        {
          [id]: true,
        },
        { merge: true }
      );
  };

  // Delete favorite
  const deleteFavorite = (userId, id) => {
    return firestore
      .collection('favorites')
      .doc(userId)
      .update({
        [id]: firebase.firestore.FieldValue.delete(),
      });
  };

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = firestore
      .collection('favorites')
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
