import { firestore } from "../firebase/firebase";

function useCart() {
  // Add an item to the user's cart
  // In the cart, each product chosen has their own id.
  const addToCart = async (
    userId,
    productId,
    name,
    image,
    color,
    options,
    quantity,
    type,
    price
  ) => {
    // If the same item is already in the cart, we simply increase the quantity.
    const sameItem = await firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .where("productId", "==", productId)
      .where("color", "==", color)
      .where("options", "==", options)
      .get();

    if (sameItem.docs.length > 0) {
      const currentQuantity = sameItem.docs[0].data().quantity;
      sameItem.docs[0].ref.update({ quantity: +currentQuantity + +quantity });
      return;
    }

    // If the item is not already in the cart, we create a document for it.
    const docRef = await firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc();

    const { id } = docRef;

    return firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(id)
      .set({
        id,
        productId,
        name,
        image,
        color,
        options,
        quantity,
        type,
        price,
      });
  };

  const deleteFromCart = (userId, id) => {
    return firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(id)
      .delete();
  };

  const updateCartQuantity = (userId, id, quantity) => {
    return firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(id)
      .update({ quantity });
  };

  // To delete the cart (=subcollection), we have to retrieve all the documents within the collection and delete them.
  const deleteCart = async (userId) => {
    const itemsId = [];
    const docs = await firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .get();
    docs.forEach((doc) => itemsId.push(doc.id));
    for (const id of itemsId) {
      deleteFromCart(userId, id);
    }
  };

  // Get an user's cart.
  const getCart = async (userId) => {
    const cart = [];
    const items = await firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .get();
    items.forEach((item) => cart.push(item.data()));
    return cart;
  };

  const cartListener = (userId, callback) => {
    return firestore
      .collection("carts")
      .doc(userId)
      .collection("items")
      .onSnapshot(callback);
  };

  return {
    addToCart,
    deleteFromCart,
    updateCartQuantity,
    deleteCart,
    getCart,
    cartListener,
  };
}

export default useCart;
