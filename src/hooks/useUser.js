import { firestore } from '../firebase/firebase';

export function useUser() {

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
    createUser,
    getUser,
    updateFirstName,
    updateLastName,
    getUserName,
  };
}