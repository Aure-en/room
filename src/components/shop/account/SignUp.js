import React from 'react';
import styled from 'styled-components';
import { useSignUp } from '../../../hooks/useSignUp';
import { Link } from 'react-router-dom';

// Icons
import check from '../../../assets/icons/icon-check.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Button and checkbox
  tertiary: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 70%)', // Input lines
  black: 'hsl(0, 0%, 0%)',
  background: 'hsl(0, 0%, 100%)',
};

const Welcome = styled.div`
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  line-height: 2.5rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0;
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

const Button = styled.button`
  margin-top: 1.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.tertiary};
  background: ${colors.secondary};
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background: ${colors.primary};
    cursor: not-allowed;
  }
`;

const Message = styled.span`
  font-size: 0.825rem;
  color: ${colors.primary};
  line-height: 1rem;
`;

const MessageLink = styled(Message)`
  cursor: pointer;
  color: ${colors.secondary};

  &:hover {
    color: ${colors.black};
  }
`;

const Checkbox = styled.input`
  visibility: hidden;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;

  &:before {
    display: inline-block;
    content: '';
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border-radius: 2px;
    border: 1px solid ${colors.secondary};
    background-color: ${(props) => (props.isChecked ? colors.secondary : '')};
    background-image: ${(props) => (props.isChecked ? `url(${check})` : '')};
    background-position: ${(props) => (props.isChecked ? 'center' : '')};
  }
`;

function SignUp({ flip }) {
  const {
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
    loading,
    isFormCompleted,
    handleSignUp,
  } = useSignUp();

  return (
    <>
      <Welcome>
        <Heading>Create an account</Heading>
        <p>Join us for a smoother shopping experience.</p>
      </Welcome>

      <form onSubmit={handleSignUp}>
        <Field>
          <Label htmlFor='first_name'>First Name</Label>
          <Input
            id='first_name'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor='last_name'>Last Name</Label>
          <Input
            id='last_name'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <Message>{emailError}</Message>}
        </Field>

        <Field>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <Message>{passwordError}</Message>}
        </Field>

        <div>
          <CheckboxLabel htmlFor='terms' isChecked={terms}>
            I have read and agree to Room's Terms of Service and Privacy Policy.
          </CheckboxLabel>
          <Checkbox
            type='checkbox'
            id='terms'
            name='terms'
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
        </div>

        <Button type='submit' disabled={loading || isFormCompleted}>
          Sign Up
        </Button>
      </form>
      <Message>
        Already have an account?{' '}
        {flip ? (
          <><MessageLink onClick={flip}>Sign in now</MessageLink>.</>
        ) : (
          <Link to='/signup'>
            <MessageLink>Sign in now</MessageLink>.
          </Link>
        )}
      </Message>
    </>
  );
}

export default SignUp;
