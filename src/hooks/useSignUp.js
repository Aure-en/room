import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useSignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  const [loading, setLoading] = useState(false);

  const { currentUser, signUp, signUpFromAnonymous } = useAuth();

  useEffect(() => {
    email && firstName && lastName && password
      ? setIsFormCompleted(false)
      : setIsFormCompleted(true);
  }, [email, firstName, lastName, password]);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setEmailError('');
    setPasswordError('');

    try {
      currentUser && currentUser.isAnonymous
        ? await signUpFromAnonymous(email, password)
        : await signUp(email, password);

      setLoading(false);
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
          setEmailError(err.message);
          break;
        case 'auth/weak-password':
          setPasswordError(err.message);
          break;
        default:
      }
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    emailError,
    passwordError,
    isFormCompleted,
    loading,
    handleSignUp
  }
}
