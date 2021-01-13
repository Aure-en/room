import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../hooks/useFirestore';

export function useSignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  const [loading, setLoading] = useState(false);

  const { currentUser, signUp, signUpFromAnonymous } = useAuth();
  const { createUser } = useFirestore();

  useEffect(() => {
    email && firstName && lastName && password && terms
      ? setIsFormCompleted(false)
      : setIsFormCompleted(true);
  }, [email, firstName, lastName, password, terms]);

  async function handleSignUp() {
    setLoading(true);
    setEmailError('');
    setPasswordError('');

    try {
      const user = (currentUser && currentUser.isAnonymous)
        ? await signUpFromAnonymous(email, password)
        : await signUp(email, password);
      console.log(user);
      await createUser(user.user.uid, firstName, lastName, email);
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
    terms,
    setTerms,
    emailError,
    passwordError,
    isFormCompleted,
    loading,
    handleSignUp
  }
}
