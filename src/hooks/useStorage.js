import { storage } from "../firebase/firebase";

function useStorage() {
  const storageRef = storage.ref();

  const uploadItemImage = (id, image) => {
    return storageRef
      .child(`products/${id}/${image.name}${id}`)
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL());
  };

  return { uploadItemImage };
}

export default useStorage;
