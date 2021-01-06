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
    const itemsList = [];
    const items = await firestore.collection('products').get();
    items.docs.map((doc) => itemsList.push(doc.data()));
    return itemsList;
  };

  // Returns only the products from a certain category
  const getCategoryItems = async (category) => {
    const itemsList = [];
    const items = await firestore.collection('products').where("categories", "array-contains", category).get();
    items.docs.map((doc => itemsList.push(doc.data())));
    return itemsList;
  }

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
    additional,
    options,
    materials,
    categories,
  ) => {

    return firestore.collection('products').doc(id).set({
      id,
      name,
      images,
      price,
      materials,
      dimensions: {
        depth: dimensions.depth,
        height: dimensions.height,
        width: dimensions.width,
      },
      description,
      colors,
      additional,
      categories,
      options,
      stock: [],
    });
  };

  // Gets an item's data
  const getItem = async (id) => {
    const doc = await firestore.collection('products').doc(id).get();
    return doc.data();
  }

  const value = {
    getShopCategories,
    getShopItems,
    getCategoryItems,
    createItem,
    addItem,
    getItem
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
