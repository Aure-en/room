import { useState } from 'react';
import { firestore } from '../firebase/firebase';

export function usePayment() {

// Add card
const [name, setName] = useState('');
const [number, setNumber] = useState('');
const [date, setDate] = useState('');
const [cvc, setCvc] = useState('');
const [message, setMessage] = useState('');

// Edit card
const [nameEdit, setNameEdit] = useState('');
const [numberEdit, setNumberEdit] = useState('');
const [dateEdit, setDateEdit] = useState('');
const [cvcEdit, setCvcEdit] = useState('');
const [messageEdit, setMessageEdit] = useState('');
const [isEditing, setIsEditing] = useState(false);

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

const handleAddCard = async (userId) => {
  setMessage('');
  try {
    await addCard(userId, name, number, date, cvc);
    setName('');
    setNumber('');
    setDate('');
    setCvc('');
    setMessage('Your card was successfully saved.');
  } catch (e) {
    setMessage('Sorry, we could not add your card.');
  }
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

const handleStartEditing = (card) => {
  setIsEditing(true);
  setNameEdit(card.name);
  setNumberEdit(card.number);
  setDateEdit(card.date);
  setCvcEdit(card.cvc);
};

const handleEditCard = async (userId, cardId) => {
  setMessageEdit('');
  try {
    await editCard(
      userId,
      cardId,
      nameEdit,
      numberEdit,
      dateEdit,
      cvcEdit
    );
    setIsEditing(false);
  } catch (e) {
    setMessageEdit('Sorry, we could not update your card.');
  }
}

const editCard = (userId, id, name, number, date, cvc) => {
  return firestore
    .collection('users')
    .doc(userId)
    .collection('cards')
    .doc(id)
    .update({
      name,
      number,
      date,
      cvc,
    });
};

const cardListener = (userId, callback) => {
  return firestore
    .collection('users')
    .doc(userId)
    .collection('cards')
    .onSnapshot(callback);
};

  return {
    handleAddCard,
    handleStartEditing,
    handleEditCard,
    deleteCard,
    getCards,
    cardListener,
    name,
    setName,
    number,
    setNumber,
    date,
    setDate,
    cvc,
    setCvc,
    message,
    nameEdit,
    setNameEdit,
    numberEdit,
    setNumberEdit,
    dateEdit,
    setDateEdit,
    cvcEdit,
    setCvcEdit,
    messageEdit,
    isEditing,
    setIsEditing
  };
}