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
    type,
    dimensions,
    images,
    description,
    colors,
    additional,
    options,
    categories,
    queries
  ) => {
    return firestore
      .collection('products')
      .doc(id)
      .set({
        id,
        name,
        price,
        type,
        dimensions,
        images,
        description,
        colors,
        additional,
        options,
        categories,
        queries,
        new: false
      });
  };

  // Search for an item
  const searchItem = (query) => {
    return firestore.collection('products').where('name', '>=', query).where('name', '<=', query+'\uf8ff').get();
  }

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
    const docs = await firestore
      .collection('carts')
      .doc(userId)
      .collection('items')
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
      lastName,
    });
  };

  const getUser = async (userId) => {
    const user = await firestore.collection('users').doc(userId).get();
    return user.data();
  };

  // -- ADDRESSES --

  // Add an address to the user's address book
  const addAddress = async (
    userId,
    firstName,
    lastName,
    address,
    zipCode,
    city,
    country,
    phone,
    email
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
        zipCode,
        city,
        country,
        phone,
        email,
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

  const editAddress = (
    userId,
    id,
    firstName,
    lastName,
    address,
    zipCode,
    city,
    country,
    phone,
    email
  ) => {
    return firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .doc(id)
      .update({
        firstName,
        lastName,
        address,
        zipCode,
        city,
        country,
        phone,
        email
      });
  };

  const addressListener = (userId, callback) => {
    return firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .onSnapshot(callback);
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

  const editCard = (userId, id, name, number, date, cvc) => {
    return firestore.collection('users').doc(userId).collection('cards').doc(id).update({
      name,
      number,
      date,
      cvc
    })
  }

  const cardListener = (userId, callback) => {
    return firestore
      .collection('users')
      .doc(userId)
      .collection('cards')
      .onSnapshot(callback);
  }

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
      date: new Date(),
    });

    return id;
  };

  // Get an order
  const getOrder = async (id) => {
    const order = await firestore.collection('orders').doc(id).get();
    return order.data();
  };

  // Search order
  const searchOrder = async (email, id) => {
    let order;
    const query = await firestore.collection('orders').where('shipping.email', '==', email).where('id', '==', id).get();
    query.forEach((doc) => { order = doc.data(); });
    return order;
  }

  // Get a user's orders
  const getOrders = async (userId) => {
    const ordersList = [];
    const orders = await firestore.collection('orders').orderBy('date').get();
    orders.forEach((order) => ordersList.push(order.data()));
    return ordersList;
  };

  // -- USER SETTINGS --

  const getUserName = async (userId) => {
    const user = await firestore.collection('users').doc(userId).get();
    return {
      firstName: user.data().firstName,
      lastName: user.data().lastName,
    };
  };

  // Get first and last name
  const updateFirstName = (userId, firstName) => {
    return firestore.collection('users').doc(userId).update({ firstName });
  };

  const updateLastName = (userId, lastName) => {
    return firestore.collection('users').doc(userId).update({ lastName });
  };

  return {
    getShopCategories,
    getShopItems,
    getCategoryItems,
    createItem,
    addItem,
    getItem,
    searchItem,
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
    editAddress,
    getAddresses,
    addressListener,
    addCard,
    deleteCard,
    getCards,
    editCard,
    cardListener,
    createOrder,
    getOrder,
    searchOrder,
    getOrders,
    getUserName,
    updateFirstName,
    updateLastName,
  };
}
