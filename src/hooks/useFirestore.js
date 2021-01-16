import { firestore } from '../firebase/firebase';

export function useFirestore() {

  // -- SHOP --

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
    const items = await firestore
      .collection('products')
      .where('categories', 'array-contains', category)
      .get();
    items.docs.map((doc) => itemsList.push(doc.data()));
    return itemsList;
  };

  // Gets an item's data
  const getItem = async (id) => {
    const doc = await firestore.collection('products').doc(id).get();
    return doc.data();
  };

  // Create a document where we'll store an item.
  // Returns the id we will attribute to the item.
  const createItem = async () => {
    return firestore.collection('products').add({});
  };

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
    categories
  ) => {
    return firestore
      .collection('products')
      .doc(id)
      .set({
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

  // -- CART --

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
      .collection('carts')
      .doc(userId)
      .collection('items')
      .where('productId', '==', productId)
      .where('color', '==', color)
      .where('options', '==', options)
      .get();

    if (sameItem.docs.length > 0) {
      const currentQuantity = sameItem.docs[0].data().quantity;
      sameItem.docs[0].ref.update({ quantity: +currentQuantity + +quantity });
      return;
    }

    // If the item is not already in the cart, we create a document for it.
    const docRef = await firestore
      .collection('carts')
      .doc(userId)
      .collection('items')
      .doc();

    const id = docRef.id;

    return firestore
      .collection('carts')
      .doc(userId)
      .collection('items')
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
      .collection('carts')
      .doc(userId)
      .collection('items')
      .doc(id)
      .delete();
  };

  const updateCartQuantity = (userId, id, quantity) => {
    return firestore
      .collection('carts')
      .doc(userId)
      .collection('items')
      .doc(id)
      .update({ quantity });
  };


  // To delete the cart (=subcollection), we have to retrieve all the documents within the collection and delete them.
  const deleteCart = async (userId) => {
    const itemsId = [];
    const docs = await firestore.collection('carts').doc(userId).collection('items').get();
    docs.forEach(doc => itemsId.push(doc.id));
    for (const id of itemsId) {
      deleteFromCart(userId, id);
    }
  }

  // Get an user's cart.
  const getCart = async (userId) => {
    const cart = [];
    const items = await firestore
      .collection('carts')
      .doc(userId)
      .collection('items')
      .get();
    items.forEach((item) => cart.push(item.data()));
    return cart;
  };

  const cartListener = (userId, callback) => {
    return firestore
      .collection('carts')
      .doc(userId)
      .collection('items')
      .onSnapshot(callback);
  };

  // -- USERS CREATION --

  // Create a real user (not an anonymous one)
  const createUser = (userId, firstName, lastName) => {
    return firestore.collection('users').doc(userId).set({
      firstName,
      lastName
    });
  };

  const getUser = async (userId) => {
    const user = await firestore.collection('users').doc(userId).get();
    return user.data();
  }

  // -- ADDRESSES --

  // Add an address to the user's address book
  const addAddress = async (
    userId,
    firstName,
    lastName,
    phone,
    address,
    email,
    zipCode,
    city,
    country
  ) => {
    const docRef = await firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .doc();
    const id = docRef.id;
    return firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .doc(id)
      .set({
        id,
        firstName,
        lastName,
        address,
        email,
        phone,
        zipCode,
        city,
        country,
      });
  };

  // Remove an address from the user's address book
  const deleteAddress = (userId, id) => {
    return firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .doc(id)
      .delete();
  };

  // Get the user's addresses
  const getAddresses = async (userId) => {
    const addressBook = [];
    const addresses = await firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .get();
    addresses.forEach((address) => addressBook.push(address.data()));
    return addressBook;
  };

  // -- PAYMENT CARDS --

  // Add a card to the user's cards list
  const addCard = async (userId, name, number, date, cvc) => {
    const docRef = await firestore
      .collection('users')
      .doc(userId)
      .collection('cards')
      .doc();
    const id = docRef.id;
    return firestore
      .collection('users')
      .doc(userId)
      .collection('cards')
      .doc(id)
      .set({
        id,
        name,
        number,
        date,
        cvc,
      });
  };

  // Remove a card from the user's cards list
  const deleteCard = (userId, id) => {
    return firestore
      .collection('users')
      .doc(userId)
      .collection('cards')
      .doc(id)
      .delete();
  };

  // Get the user's cards
  const getCards = async (userId) => {
    const cardsList = [];
    const cards = await firestore
      .collection('users')
      .doc(userId)
      .collection('cards')
      .get();
    cards.forEach((card) => cardsList.push(card.data()));
    return cardsList;
  };

  // -- ORDERS --

  // Create an order
  const createOrder = async (products, shipping, card, user) => {
    const docRef = await firestore.collection('orders').doc();
    const id = docRef.id;

    await firestore.collection('orders').doc(id).set({
      user,
      id,
      products,
      shipping,
      card,
      status: 'Preparation',
      date: new Date()
    });

    return id;
  };

  // Get an order
  const getOrder = async (id) => {
    const order = await firestore.collection('orders').doc(id).get();
    return order.data();
  };

  // Get a user's orders
  const getOrders = async (userId) => {
    const ordersList = [];
    const orders = await firestore
      .collection('orders')
      .orderBy('date')
      .get();
    orders.forEach((order) => ordersList.push(order.data()));
    return ordersList;
  }

  // -- USER SETTINGS --

  const getUserName = async (userId) => {
    const user = await firestore.collection('users').doc(userId).get();
    return {
      firstName: user.data().firstName,
      lastName: user.data().lastName
    }
  }

  const updateFirstName = (userId, firstName) => {
    return firestore.collection('users').doc(userId).update({firstName});
  }

  const updateLastName = (userId, lastName) => {
    return firestore.collection('users').doc(userId).update({lastName});
  }

  // Get first and last name

  return {
    getShopCategories,
    getShopItems,
    getCategoryItems,
    createItem,
    addItem,
    getItem,
    addToCart,
    getCart,
    deleteFromCart,
    updateCartQuantity,
    deleteCart,
    cartListener,
    createUser,
    getUser,
    addAddress,
    deleteAddress,
    getAddresses,
    addCard,
    deleteCard,
    getCards,
    createOrder,
    getOrder,
    getOrders,
    getUserName,
    updateFirstName,
    updateLastName,
  };
}
