import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export function useSignIn() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const history = useHistory();

  async function handleSignIn() {
    clearErrors();

    if (!password && !email) {
      setPasswordError('This field is required');
      setEmailError('This field is required');
      return;
    } else if (!password) {
      setPasswordError('This field is required');
      return;
    } else if (!email) {
      setEmailError('This field is required');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      history.push('/');
      setLoading(false);
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setEmailError('Login or password is invalid');
          setPasswordError('Login or password is invalid');
          setLoading(false);
          break;
        default:
          setPasswordError('Sorry, the sign in failed.');
          setLoading(false);
      }
    }
  }

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    clearErrors();

    if (!email) {
      setEmailError('This field is required');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      setLoading(false);
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
          setEmailError('Email does not exist');
          break;
        default:
          setEmailError('Sorry, we were unable to reset your password.');
      }
    }
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    loading,
    setLoading,
    handleSignIn,
    handleForgotPassword
  };
}