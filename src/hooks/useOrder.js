import { firestore } from "../firebase/firebase";

function useOrder() {
  // Create an order
  const createOrder = async (products, shipping, card, user) => {
    const docRef = await firestore.collection("orders").doc();
    const { id } = docRef;

    await firestore.collection("orders").doc(id).set({
      user,
      id,
      products,
      shipping,
      card,
      status: "Preparation",
      date: new Date(),
    });

    return id;
  };

  // Get an order
  const getOrder = async (id) => {
    const order = await firestore.collection("orders").doc(id).get();
    return order.data();
  };

  // Search order
  const searchOrder = async (email, id) => {
    let order;
    const query = await firestore
      .collection("orders")
      .where("shipping.email", "==", email)
      .where("id", "==", id)
      .get();
    query.forEach((doc) => {
      order = doc.data();
    });
    return order;
  };

  // Get a user's orders
  const getOrders = async (userId) => {
    const ordersList = [];
    const orders = await firestore
      .collection("orders")
      .where("user", "==", userId)
      .orderBy("date")
      .get();
    orders.forEach((order) => ordersList.push(order.data()));
    return ordersList;
  };

  return {
    createOrder,
    getOrder,
    searchOrder,
    getOrders,
  };
}

export default useOrder;
