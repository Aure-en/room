import React, { useContext } from 'react';
import { firestore } from '../firebase/firebase';

const FirestoreContext = React.createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {

  // Returns an object representing all the shopping categories.
  const getShopCategories = async () => {
    const categories = await firestore.collection('navigation').doc('categories').get();
    return categories.data();
  }

  const value = {
    getShopCategories,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  )
}
