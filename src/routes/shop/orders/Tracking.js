import React, { useState } from 'react';
import styled from 'styled-components';
import { useFirestore } from '../../../hooks/useFirestore';
import Order from '../../../components/shop/account/Order';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Dark Grey
  tertiary: 'hsl(0, 0%, 70%)', // Bright Grey
  text: 'hsl(0, 0%, 85%)',
  label: 'hsl(0, 0%, 100%)',
  dark: 'hsl(0, 0%, 0%)',
};

const Container = styled.div`
  margin: 5rem;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Category = styled.div`
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
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

const Message = styled.div`
  text-align: center;
  font-size: 0.825rem;
  color: ${colors.primary};
  margin-top: 0.25rem;
`;

function Tracking() {

  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState();
  const [message, setMessage] = useState('');
  const { searchOrder } = useFirestore();

  const handleSearchOrder = async (e) => {
    e.preventDefault();
    setMessage('');
    const order = await searchOrder(email, orderId);
    order ? setOrder(order) : setMessage('Sorry, we could not find your order.');
  }

  return (
    <Container>
      <Heading>Order Tracking</Heading>

      <div>
        <Category>Track your order</Category>
        <Form onSubmit={handleSearchOrder}>
          <Fields>
            <Field>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                value={email}
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
              />
            </Field>

            <Field>
              <Label htmlFor='order_id'>Order</Label>
              <Input
                type='text'
                value={orderId}
                id='order_id'
                onChange={(e) => setOrderId(e.target.value)}
                placeholder='Enter your order number'
              />
            </Field>
          </Fields>
          <Button type="submit">Track your order</Button>
          <Message>{message}</Message>
        </Form>
      </div>

      {order &&
        <div>
          <Category>Order</Category>
          <Order order={order} />
        </div>
      }
    </Container>
  )
}

export default Tracking
