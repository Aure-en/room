import { storage } from '../firebase/firebase';

export function useStorage() {

  const storageRef = storage.ref();

  const uploadItemImage = (id, image) => {
    return storageRef
      .child(`products/${id}/${image.name}`)
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL());
  };

  return { uploadItemImage };
}