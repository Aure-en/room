import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../../../hooks/useFirestore';
import { useAuth } from '../../../contexts/AuthContext';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import Order from '../../../components/shop/checkout/Order';
import { Redirect, useHistory } from 'react-router-dom';

// Icon
import check from '../../../assets/icons/icon-check.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Button and checkbox
  tertiary: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 70%)', // Input lines
  black: 'hsl(0, 0%, 0%)',
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const OrderRecap = styled.div`
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 40vw;
`;

const Category = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem 5rem;
  margin: 1.25rem 0 3rem 0;
`;

const CategoryName = styled.div`
  grid-column: 1 / -1;
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLarge = styled(Field)`
  grid-column: 1 / -1;
`;

const Button = styled.button`
  margin-top: 2.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.tertiary};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
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

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

function Personal({ location }) {
  /* Props :
    - location.state.hasAccount : true if user already has an account.

    * If the user already has an account :
      - We will load his addresses if he has any, so he can checkout faster.
      - If he wants to enter a new address, we ask him if he wants to remember it.
  */

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additional, setAdditional] = useState('');
  const [remember, setRemember] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push({
      pathname: '/shop/payment',
      state: {
        hasAccount: location.state.hasAccount,
        personal: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          zipCode,
          country,
          additional,
        },
      },
    });
  };

  return (
    <>
      {/* If the user didn't access to this page via the cart links,
       - Redirect them to their cart.
       - Otherwise, ask for their personal details. */}
      {location.state ? (
        <Wrapper>
          <header>
            <Nav />
            <ShopNav />
          </header>

          <Container>
            <OrderRecap>
              <Form onSubmit={handleSubmit}>
                <Heading>Personal Details</Heading>

                <CategoryName>General</CategoryName>
                <Category>
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
                </Category>

                <CategoryName>Delivery</CategoryName>
                <Category>
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

                  <FieldLarge>
                    <Label htmlFor='additional'>Additional Informations</Label>
                    <Input
                      type='text'
                      id='additional'
                      value={additional}
                      onChange={(e) => setAdditional(e.target.value)}
                      placeholder='Anything else you would like to tell us (building entrance codes, prefered delivery time...)'
                    />
                  </FieldLarge>
                </Category>

                {location.state.hasAccount && (
                  <>
                    <CheckboxLabel htmlFor='remember' isChecked={remember}>
                      Remember my informations for easier checkout.
                    </CheckboxLabel>
                    <Checkbox
                      type='checkbox'
                      id='remember'
                      name='remember'
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                    />
                  </>
                )}

                <Button type='submit'>Proceed to Payment</Button>
              </Form>
              <Order />
            </OrderRecap>
          </Container>
        </Wrapper>
      ) : (
        <Redirect to='/shop/cart' />
      )}
    </>
  );
}

export default Personal;
