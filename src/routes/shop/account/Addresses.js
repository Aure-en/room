import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useFirestore } from '../../../hooks/useFirestore';
import styled from 'styled-components';
import Modal from 'react-modal';

// Icons
import { ReactComponent as Plus } from '../../../assets/icons/icon-plus.svg';
import { ReactComponent as Minus } from '../../../assets/icons/icon-minus.svg';
import { ReactComponent as Close } from '../../../assets/icons/icon-close.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Dark Grey
  tertiary: 'hsl(0, 0%, 70%)', // Bright Grey
  text: 'hsl(0, 0%, 85%)',
  label: 'hsl(0, 0%, 100%)',
  dark: 'hsl(0, 0%, 0%)',
};

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Subheading = styled.div`
  border-bottom: 1px solid ${colors.black};
  text-transform: uppercase;
  color: ${colors.black};
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;

const FormHeading = styled(Subheading)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;

const Instructions = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: ${colors.secondary};
`;

const AddressBook = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 2rem;
  grid-gap: 2rem;
`;

const Address = styled.div`
  padding: 1rem;
  border: 1px solid ${colors.tertiary};
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem 5rem;
  margin-bottom: 2.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${colors.input};
  padding: 0.5rem 0 0.25rem 0;
  font-family: 'Source Sans Pro', sans-serif;

  &::placeholder {
    color: ${colors.input};
  }

  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${colors.label};
  }
`;

const ButtonEmpty = styled(Button)`
  background: transparent;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};

  &:hover {
    color: ${colors.dark};
  }
`;

const EditModal = styled(Modal)`
  position: absolute;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.label};
  padding: 4rem;
  border: 1px solid ${colors.secondary};

  &:focus {
    outline: none;
  }
`;

const EditHeading = styled.h2`
  text-align: center;
  font-family: 'Playfair Display', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  text-align: center;
  font-size: 0.825rem;
  color: ${colors.primary};
  margin-top: 0.25rem;
`;

const Icon = styled.button`
  position: absolute;
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  color: ${colors.primary};

  &:hover {
    color: ${colors.secondary};
  }
`;

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  const [firstNameEdit, setFirstNameEdit] = useState('');
  const [lastNameEdit, setLastNameEdit] = useState('');
  const [addressEdit, setAddressEdit] = useState('');
  const [cityEdit, setCityEdit] = useState('');
  const [zipCodeEdit, setZipCodeEdit] = useState('');
  const [countryEdit, setCountryEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [phoneEdit, setPhoneEdit] = useState('');
  const [messageEdit, setMessageEdit] = useState('');

  const { currentUser } = useAuth();
  const {
    addAddress,
    deleteAddress,
    editAddress,
    getAddresses,
    addressListener,
  } = useFirestore();

  useEffect(() => {
    (async () => {
      const addresses = await getAddresses(currentUser.uid);
      setAddresses(addresses);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = addressListener(currentUser.uid, async () => {
      const addresses = await getAddresses(currentUser.uid);
      setAddresses(addresses);
    });
    return unsubscribe;
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await addAddress(
        currentUser.uid,
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

  const openEdit = (address) => {
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

  return (
    <div>
      <Heading>Address Book</Heading>
      <div>
        <Subheading>Current addresses</Subheading>
        {addresses.length === 0 ? (
          <Instructions>
            <div>You do not currently have any saved addresses.</div>
            <div>Add one by completing the form below.</div>
          </Instructions>
        ) : (
          <AddressBook>
            {addresses.map((address) => {
              return (
                <React.Fragment key={address.id}>
                  <Address>
                    <strong>
                      {address.firstName} {address.lastName}
                    </strong>
                    <div>{address.address}</div>
                    <div>
                      {address.zipCode} {address.city}
                    </div>
                    <div>{address.country}</div>

                    <Buttons>
                      <ButtonEmpty onClick={() => openEdit(address)}>
                        Edit
                      </ButtonEmpty>
                      <Button
                        onClick={() =>
                          deleteAddress(currentUser.uid, address.id)
                        }
                      >
                        Delete
                      </Button>
                    </Buttons>
                  </Address>

                  <EditModal
                    isOpen={isEditing}
                    onRequestClose={() => setIsEditing(false)}
                    style={{
                      overlay: {
                        backgroundColor: 'rgba(255, 255, 255, .55)',
                      },
                    }}
                  >
                    <EditHeading>Edit your address</EditHeading>
                    <Icon onClick={() => setIsEditing(false)}><Close /></Icon>
                    <Form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setMessageEdit('');

                        try {
                        await editAddress(
                          currentUser.uid,
                          address.id,
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
                        } catch(e) {
                          setMessageEdit('Sorry, we could not update your address.')
                        }
                      }}
                    >
                      <Category>General</Category>
                      <Fields>
                        <Field>
                          <Label htmlFor='first_name_edit'>First Name</Label>
                          <Input
                            type='text'
                            value={firstNameEdit}
                            id='first_name_edit'
                            onChange={(e) => setFirstNameEdit(e.target.value)}
                            placeholder='Enter your first name'
                          />
                        </Field>

                        <Field>
                          <Label htmlFor='last_name_edit'>Last Name</Label>
                          <Input
                            type='text'
                            value={lastNameEdit}
                            id='last_name_edit'
                            onChange={(e) => setLastNameEdit(e.target.value)}
                            placeholder='Enter your last name'
                          />
                        </Field>

                        <Field>
                          <Label htmlFor='email_edit'>Email</Label>
                          <Input
                            type='email'
                            id='email_edit'
                            value={emailEdit}
                            onChange={(e) => setEmailEdit(e.target.value)}
                            placeholder='Enter your email'
                          />
                        </Field>

                        <Field>
                          <Label htmlFor='phone_edit'>Phone Number</Label>
                          <Input
                            type='tel'
                            id='phone_edit'
                            value={phoneEdit}
                            onChange={(e) => setPhoneEdit(e.target.value)}
                            placeholder='Enter your phone number'
                          />
                        </Field>
                      </Fields>

                      <Category>Delivery</Category>

                      <Fields>
                        <Field>
                          <Label htmlFor='address_edit'>Address</Label>
                          <Input
                            type='text'
                            id='address_edit'
                            value={addressEdit}
                            onChange={(e) => setAddressEdit(e.target.value)}
                            placeholder='Enter your address'
                          />
                        </Field>

                        <Field>
                          <Label htmlFor='zip_code_edit'>Zip Code</Label>
                          <Input
                            type='text'
                            id='zip_code_edit'
                            value={zipCodeEdit}
                            onChange={(e) => setZipCodeEdit(e.target.value)}
                            placeholder='Enter your zip code'
                          />
                        </Field>

                        <Field>
                          <Label htmlFor='city_edit'>City</Label>
                          <Input
                            type='text'
                            id='city_edit'
                            value={cityEdit}
                            onChange={(e) => setCityEdit(e.target.value)}
                            placeholder='Enter your city'
                          />
                        </Field>

                        <Field>
                          <Label htmlFor='country_edit'>Country</Label>
                          <Input
                            type='text'
                            id='country_edit'
                            value={countryEdit}
                            onChange={(e) => setCountryEdit(e.target.value)}
                            placeholder='Enter your country'
                          />
                        </Field>
                      </Fields>
                      <Buttons>
                        <ButtonEmpty onClick={() => setIsEditing(false)}>
                          Cancel
                        </ButtonEmpty>
                        <Button type='submit'>Edit your address</Button>
                      </Buttons>
                      <Message>{messageEdit}</Message>
                    </Form>
                  </EditModal>
                </React.Fragment>
              );
            })}
          </AddressBook>
        )}

        <FormHeading onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Add a new address
          {isDropdownOpen ? <Minus /> : <Plus />}
        </FormHeading>

        {isDropdownOpen && (
          <Form onSubmit={handleAddAddress}>
            <Category>General</Category>
            <Fields>
              <Field>
                <Label htmlFor='first_name'>First Name</Label>
                <Input
                  type='text'
                  value={firstName}
                  id='first_name'
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='Enter your first name'
                />
              </Field>

              <Field>
                <Label htmlFor='last_name'>Last Name</Label>
                <Input
                  type='text'
                  value={lastName}
                  id='last_name'
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Enter your last name'
                />
              </Field>

              <Field>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                />
              </Field>

              <Field>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  type='tel'
                  id='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Enter your phone number'
                />
              </Field>
            </Fields>

            <Category>Delivery</Category>

            <Fields>
              <Field>
                <Label htmlFor='address'>Address</Label>
                <Input
                  type='text'
                  id='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Enter your address'
                />
              </Field>

              <Field>
                <Label htmlFor='zip_code'>Zip Code</Label>
                <Input
                  type='text'
                  id='zip_code'
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder='Enter your zip code'
                />
              </Field>

              <Field>
                <Label htmlFor='city'>City</Label>
                <Input
                  type='text'
                  id='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder='Enter your city'
                />
              </Field>

              <Field>
                <Label htmlFor='country'>Country</Label>
                <Input
                  type='text'
                  id='country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder='Enter your country'
                />
              </Field>
            </Fields>

            <Button type='submit'>Add a new address</Button>
            <Message>{message}</Message>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Addresses;
