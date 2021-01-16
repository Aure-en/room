import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserSettings } from '../../../hooks/useUserSettings';
import { useFirestore } from '../../../hooks/useFirestore';
import AccountNav from '../../../components/shop/account/AccountNav';
import styled from 'styled-components';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Button and checkbox
  tertiary: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 70%)', // Input lines
  black: 'hsl(0, 0%, 0%)',
};

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 40vw;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem 5rem;
  margin: 1.25rem 0 3rem 0;
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

const Message = styled.div`
  text-align: center;
  font-size: 0.825rem;
  color: ${colors.primary};
  margin-top: 0.25rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.tertiary};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

function Settings() {
  const { currentUser } = useAuth();
  const { getUserName, updateFirstName, updateLastName } = useFirestore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentName, setCurrentName] = useState({
    firstName: '',
    lastName: '',
  });
  const {
    email,
    setEmail,
    emailError,
    currentPassword,
    setCurrentPassword,
    currentPasswordError,
    newPassword,
    setNewPassword,
    newPasswordError,
    newPasswordConfirmation,
    setNewPasswordConfirmation,
    newPasswordConfirmationError,
    clearErrors,
    handleUpdateEmail,
    handleUpdatePassword,
    message,
    setMessage,
  } = useUserSettings();

  // Loads current user data
  useEffect(() => {
    (async () => {
      const user = await getUserName(currentUser.uid);
      setCurrentName(user);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    })();
    setEmail(currentUser.email);
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    clearErrors();

    if (currentName.firstName !== firstName) {
      updateFirstName(currentUser.uid, firstName);
      setMessage('Your information was successfully updated.');
    }

    if (currentName.lastName !== lastName) {
      updateLastName(currentUser.uid, lastName);
      setMessage('Your information was successfully updated.');
    }

    if (email !== currentUser.email) {
      handleUpdateEmail();
    }

    if (newPassword) {
      handleUpdatePassword();
    }
  };

  return (
    <section>
      <Heading>Settings</Heading>

      <Form onSubmit={handleSaveChanges}>
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
            {emailError && <Message>{emailError}</Message>}
          </Field>

          <Field>
            <Label htmlFor='current_password'>Current Password</Label>
            <Input
              type='password'
              id='current_password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder='Enter your current password'
            />
            {currentPasswordError && (
              <Message>{currentPasswordError}</Message>
            )}
          </Field>

          <Field>
            <Label htmlFor='new_password'>New Password</Label>
            <Input
              type='password'
              id='new_password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='Enter your new password'
            />
            {newPasswordError && <Message>{newPasswordError}</Message>}
          </Field>

          <Field>
            <Label htmlFor='new_password_confirmation'>
              New Password Confirmation
            </Label>
            <Input
              type='password'
              id='new_password_confirmation'
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              placeholder='Enter your new password again'
            />
            {newPasswordConfirmationError && (
              <Message>{newPasswordConfirmationError}</Message>
            )}
          </Field>
        </Fields>

        <Button type='submit'>Save Changes</Button>
        <Message>{message}</Message>
      </Form>
    </section>
  );
}

export default Settings;
