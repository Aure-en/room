import { firestore } from '../firebase/firebase';

export function useShop() {
  // Create a document where we'll store an item.
  // Returns the id we will attribute to the item.
  const createItem = async () => {
    return firestore.collection('products').add({});
  };

  // Puts the item data in the document.
  const addItem = async (
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
    await firestore.collection('products').doc(id).set({
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
      new: false,
    });
    return id;
  };

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

  const getNewItems = async () => {
    const itemsList = [];
    const items = await firestore
      .collection('products')
      .where('new', '==', true)
      .get();
    items.docs.map((doc) => itemsList.push(doc.data()));
    return itemsList;
  };

  // Gets an item's data
  const getItem = async (id) => {
    const doc = await firestore.collection('products').doc(id).get();
    return doc.data();
  };

  // Gets similar items to recommend them to the user
  const getRecommendations = async (id) => {
    const item = await getItem(id);
    const recommendations = [];

    const sameCollection = await firestore
      .collection('products')
      .where('name', '==', item.name)
      .where('id', '!=', item.id)
      .limit(12)
      .get();

    const sameCategory = await firestore
      .collection('products')
      .where(
        'categories',
        'array-contains',
        item.categories[item.categories.length - 1]
      )
      .where('id', '!=', item.id)
      .limit(12)
      .get();

    sameCollection.docs.forEach((item) => recommendations.push(item.data()));
    // Filter to avoid having the same item twice.
    sameCategory.docs.forEach(
      (item) =>
        recommendations.filter(
          (recommendation) => recommendation.id === item.id
        ).length === 0 && recommendations.push(item.data())
    );
    return recommendations;
  };

  // Search for an item
  const searchItem = (query) => {
    return firestore
      .collection('products')
      .where('queries.search', 'array-contains', query)
      .get();
  };

  return {
    createItem,
    addItem,
    getShopCategories,
    getShopItems,
    getCategoryItems,
    getNewItems,
    getItem,
    getRecommendations,
    searchItem,
  };
}
