import React, { useContext } from 'react';
import { firestore } from '../firebase/firebase';

const FirestoreContext = React.createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  // Returns an object representing all the shopping categories.
  const getShopCategories = async () => {
    const categories = await firestore
      .collection('navigation')
      .doc('categories')
      .get();
    return categories.data();
  };

  // Returns all the products we are selling.
  const getShopItems = async () => {
    const items = await firestore.collection('products').get();
    items.docs.map((doc) => console.log(doc.data()));
  };

  // Create a document where we'll store an item.
  // Returns the id we will attribute to the item.
  const createItem = async () => {
    return firestore.collection('products').add({})
  }

  // Puts the item data in the document.
  const addItem = (
    id,
    name,
    price,
    dimensions,
    images,
    description,
    colors,
    details,
    additional,
    categories,
    type
  ) => {

    return firestore.collection('products').doc(id).set({
      id,
      name,
      images,
      price,
      dimensions: {
        depth: dimensions.depth,
        height: dimensions.height,
        width: dimensions.width,
      },
      description,
      colors,
      details,
      additional,
      categories,
      type,
      stock: [],
    });
  };

  const value = {
    getShopCategories,
    getShopItems,
    createItem,
    addItem,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
