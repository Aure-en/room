import React, { useContext } from 'react';
import { storage } from '../firebase/firebase';

const StorageContext = React.createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const storageRef = storage.ref();

  const uploadItemImage = (id, image) => {
    return storageRef
      .child(`products/${id}/${image.name}`)
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL());
  };

  const value = {
    uploadItemImage,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
