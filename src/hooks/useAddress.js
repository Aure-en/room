import { firestore } from '../firebase/firebase';
import { useState } from 'react';

export function useAddress() {
  // Add address
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Edit address
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameEdit, setFirstNameEdit] = useState('');
  const [lastNameEdit, setLastNameEdit] = useState('');
  const [addressEdit, setAddressEdit] = useState('');
  const [cityEdit, setCityEdit] = useState('');
  const [zipCodeEdit, setZipCodeEdit] = useState('');
  const [countryEdit, setCountryEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [phoneEdit, setPhoneEdit] = useState('');
  const [messageEdit, setMessageEdit] = useState('');

  const handleAddAddress = async (userId) => {
    setMessage('');
    try {
      await addAddress(
        userId,
        firstName,
        lastName,
        address,
        zipCode,
        city,
        country,
        phone,
        email
      );
      setFirstName('');
      setLastName('');
      setAddress('');
      setZipCode('');
      setCity('');
      setCountry('');
      setPhone('');
      setEmail('');
      setMessage('Your address was successfully saved.');
    } catch (e) {
      setMessage('Sorry, we could not add your address.');
    }
  };

  // Automatically enters the previous data in the fields.
  const handleStartEditing = (address) => {
    setIsEditing(true);
    setFirstNameEdit(address.firstName);
    setLastNameEdit(address.lastName);
    setAddressEdit(address.address);
    setCityEdit(address.city);
    setZipCodeEdit(address.zipCode);
    setCountryEdit(address.country);
    setEmailEdit(address.email);
    setPhoneEdit(address.phone);
  };

  const handleEditAddress = async (userId, addressId) => {
    setMessageEdit('');
    try {
      await editAddress(
        userId,
        addressId,
        firstNameEdit,
        lastNameEdit,
        addressEdit,
        zipCodeEdit,
        cityEdit,
        countryEdit,
        phoneEdit,
        emailEdit
      );
      setIsEditing(false);
    } catch (e) {
      setMessageEdit('Sorry, we could not update your address.');
    }
  };

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
        email,
      });
  };

  const addressListener = (userId, callback) => {
    return firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .onSnapshot(callback);
  };

  return {
    handleAddAddress,
    handleStartEditing,
    handleEditAddress,
    deleteAddress,
    getAddresses,
    addressListener,

    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    city,
    setCity,
    zipCode,
    setZipCode,
    country,
    setCountry,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    setMessage,
    isEditing,
    setIsEditing,
    firstNameEdit,
    setFirstNameEdit,
    lastNameEdit,
    setLastNameEdit,
    addressEdit,
    setAddressEdit,
    cityEdit,
    setCityEdit,
    zipCodeEdit,
    setZipCodeEdit,
    countryEdit,
    setCountryEdit,
    emailEdit,
    setEmailEdit,
    phoneEdit,
    setPhoneEdit,
    messageEdit,
    setMessageEdit,
  };
}
