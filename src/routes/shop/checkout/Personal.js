import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Order from '../../../components/shop/checkout/Order';
import { useFirestore } from '../../../hooks/useFirestore';
import { useAuth } from '../../../contexts/AuthContext';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import { Redirect } from 'react-router-dom';

const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  border: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 70%)', // Input lines
  black: 'hsl(0, 0%, 0%)',
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderRecap = styled.div`
  padding: 5rem;
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const Form = styled.form`
  min-width: 40vw;
`;

const Informations = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem 5rem;
`;

const Category = styled.div`
  grid-column: 1 / -1;
  border-bottom: 1px solid ${colors.border};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
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

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
`;

function Personal({ location }) {

  /* Props :
    - location.state.isCreatingAccount : true if user said he wants to create an account.
    - location.state.hasAccount : true if user already has an account.
  */

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additional, setAdditional] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* If the user didn't access to this page via the cart links,
       - Redirect them to their cart.
       - Otherwise, ask for their personal details. */}
      {location.state ? (
        <>
          <header>
            <Nav />
            <ShopNav />
          </header>

          <Container>
            <OrderRecap>
              <Form onSubmit={handleSubmit}>
                <Heading>Personal Details</Heading>
                <Informations>

                  <Category>General</Category>

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

                  <Category>Delivery</Category>

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
                </Informations>
              </Form>

              <Order />
            </OrderRecap>
          </Container>
        </>
      ) : (
        <Redirect to='/shop/cart' />
      )}
    </>
  );
}

export default Personal;
