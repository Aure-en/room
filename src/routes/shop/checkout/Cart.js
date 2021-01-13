import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartItem from '../../../components/shop/cart/CartItem';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import { useFirestore } from '../../../hooks/useFirestore';
import { useAuth } from '../../../contexts/AuthContext';
import { useSignIn } from '../../../hooks/useSignIn';
import { Link } from 'react-router-dom';

// Icons
import { ReactComponent as Basket } from '../../../assets/icons/icon-basket.svg';

// Styled components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Darker grey - for payment background
  text: 'hsl(0, 0%, 95%)', // White - for payment text
  button: 'hsl(0, 0%, 100%)',
  border: 'hsl(0, 0%, 90%)',
  hover: 'hsl(0, 0%, 0%)', // Black - Continue Shopping Hover
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 5rem;
`;

const ShoppingCart = styled.div`
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const ItemList = styled.div`
  margin-right: 5rem;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  border-bottom: 1px solid ${colors.border};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  justify-items: center;
  padding-bottom: 0.75rem;
`;

const Product = styled.div`
  min-width: 320px;
`;

const Placeholder = styled.div`
  width: 20px;
`;

const Subtotal = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
`;

const Bottom = styled.div`
  margin: 1rem 0;
  color: ${colors.secondary};
  display: flex;
  justify-content: space-between;

  &:hover {
    color: ${colors.hover};
  }
`;

// Empty Cart

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyCartText = styled.div`
  font-family: 'Playfair Display', sans-serif;
  font-size: 1.125rem;
`;

const Button = styled.button`
  margin-top: 2.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

// Proceed to payment window
const ToPayment = styled.div`
  background: ${colors.secondary};
  color: ${colors.text};
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const PaymentText = styled.div`
  font-size: 0.9rem;
  line-height: 1.1rem;
`;

const PaymentTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

const PaymentHeading = styled.div`
  align-self: center;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PaymentChoice = styled.span`
  font-size: 1.125rem;
`;

const button = `
  display: inline-block;
  background: ${colors.text};
  color: ${colors.secondary};
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-family: 'Source Sans Pro', sans-serif;

  &:hover {
    background: ${colors.button};
}`;

const PaymentLink = styled.span`
  ${button}
  align-self: center;
`;

const PaymentBtn = styled.button`
  ${button}

  &:disabled {
    background: ${colors.primary};
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  background: ${colors.text};
  padding: 1.25rem;
  margin: 1rem 1rem 0 1rem;
  border-radius: 3px;

  & > *:first-child {
    margin-bottom: 1.5rem;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${colors.secondary};
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid ${colors.lightGrey};
  padding: 0.5rem 0 0.25rem 0;
  font-family: 'Source Sans Pro', sans-serif;

  &::placeholder {
    color: ${colors.lightGrey};
  }

  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;

const Error = styled.div`
  font-size: 0.825rem;
  color: ${colors.secondary};
  line-height: 1rem;
`;

const Message = styled(Error)`
  cursor: pointer;
`;

function Cart() {
  const [cart, setCart] = useState([]);
  const { getCart, cartListener } = useFirestore();

  // Used to sign in before checking out.
  const { currentUser } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    loading,
    handleSignIn,
    handleForgotPassword,
  } = useSignIn();

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const cart = await getCart(currentUser.uid);
      setCart(cart);
    })();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = cartListener(currentUser.uid, async () => {
      const cart = await getCart(currentUser.uid);
      setCart(cart);
    });
    return unsubscribe;
  }, []);

  // Helper functions to render
  const renderCart = (cart) => {
    if (cart.length === 0) {
      return (
        <EmptyCart>
          <Heading>Shopping Cart</Heading>
          <Basket />
          <EmptyCartText>Oh no, it seems that your cart is empty.</EmptyCartText>
          <div>We have a lot of lovely ideas to help you fill it.</div>
          <Button><Link to='/shop'>Inspire Me</Link></Button>
        </EmptyCart>
      )
    } else {
      return (
        <ItemList>
            <Heading>Shopping Cart</Heading>
            <Legend>
              <Product>Product</Product>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              {/* Replace the "X" Icon to align the grid */}
              <Placeholder></Placeholder>
            </Legend>
            <div>
              <ul>
                {cart.map((item) => {
                  return (
                    <li key={item.id}>
                      <CartItem item={item} />
                    </li>
                  );
                })}
              </ul>
            </div>

            <Bottom>
              <Link to='/shop'>← Continue Shopping</Link>
              <Subtotal>
                Subtotal: £
                {cart.reduce(
                  (sum, item) => +item.price * +item.quantity + sum,
                  0
                )}
              </Subtotal>
            </Bottom>
          </ItemList>
      )
    }
  }

  const renderBox = (cart, currentUser) => {
    if (cart.length === 0) return;

    // If the user isn't logged in, we'll suggest him to create an account / log in.
    if (currentUser && currentUser.isAnonymous) {
      return (
        <ToPayment>
            <PaymentHeading>
              <PaymentTitle>Thank you for shopping with us!</PaymentTitle>
              <PaymentText>
                We sincerely hope that all our products will satisfy your needs
                and enhance your interior.
              </PaymentText>
            </PaymentHeading>

            <PaymentChoice>Already a customer ?</PaymentChoice>
            <PaymentText>Sign in to continue shopping.</PaymentText>

            <form onSubmit={handleSignIn}>
              <Form>
                <Field>
                  <Label>Email</Label>
                  <Input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <Error>{emailError}</Error>}
                </Field>

                <Field>
                  <Label>Password</Label>
                  <Input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <Error>{passwordError}</Error>}
                </Field>
                <Message onClick={handleForgotPassword}>
                  Forgot your password?
                </Message>
              </Form>

              <Flex>
                <PaymentBtn type='submit' disabled={loading}>
                  Sign In
                </PaymentBtn>
              </Flex>
            </form>

            <PaymentChoice>Don't have an account yet?</PaymentChoice>
            <PaymentText>
              Create one to quickly manage your orders and checkout. We promise
              it will only take a minute.
            </PaymentText>
            <PaymentLink>
              <Link
                to={{
                  pathname: '/account/entry',
                  state: {
                    isPaying: true,
                  },
                }}
              >
                Create an account
              </Link>
            </PaymentLink>

            <PaymentText>Or simply proceed to checkout as a guest.</PaymentText>
            <PaymentLink>
              <Link
                to={{
                  pathname: '/shop/personal',
                  state: {
                    isPaying: true,
                  },
                }}
              >
                Checkout as a guest
              </Link>
            </PaymentLink>
          </ToPayment>
      )
    // Else, we'll just let him proceed.
    } else {
      return (
        <ToPayment>
          <PaymentHeading>
            <PaymentTitle>Thank you for shopping with us!</PaymentTitle>
          </PaymentHeading>


          <PaymentText>
            We sincerely hope that all our products will satisfy your needs
            and enhance your interior.
          </PaymentText>

            <PaymentBtn>
              <Link
                to={{
                  pathname: '/shop/personal',
                  state: {
                    isPaying: true,
                  },
                }}
              >
                Continue
              </Link>
            </PaymentBtn>

        </ToPayment>
      )
    }
  }

  return (
    <Wrapper>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <ShoppingCart>
          {renderCart(cart)}
          {renderBox(cart, currentUser)}
        </ShoppingCart>
      </Container>
    </Wrapper>
  );
}

export default Cart;
