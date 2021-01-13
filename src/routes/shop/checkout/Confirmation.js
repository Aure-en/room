import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import { useFirestore } from '../../../hooks/useFirestore';

const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Darker grey - for payment background
  text: 'hsl(0, 0%, 95%)', // White - for payment text
  button: 'hsl(0, 0%, 100%)',
  border: 'hsl(0, 0%, 90%)',
  dark: 'hsl(0, 0%, 0%)', // Black - Continue Shopping Hover
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

const Main = styled.div`
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const Order = styled.div`
  min-width: 40vw;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
`;

const Product = styled.li`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: auto 3fr 1fr 1fr;
  align-items: center;
`;

const Image = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

const Name = styled.div`
  text-transform: uppercase;
`;

const Price = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${colors.secondary};
  justify-self: end;
`;

const Type = styled.span`
  font-size: 0.9rem;
  color: ${colors.primary};
`;

const OrderTotal = styled.div`
  display: grid;
  align-self: flex-end;
  grid-template-columns: repeat(2, auto);
  grid-gap: .5rem 1.5rem;
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

const Total = styled.div`
  color: ${colors.dark};
  font-weight: 600;
`;

const Message = styled.aside`
  margin-left: 5rem;
  background: ${colors.secondary};
  color: ${colors.text};
  padding: 4rem;
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  line-height: 1.25rem;
  text-align: justify;

  & > * {
    margin-bottom: 1rem;
  }
`;

const MessageHeading = styled.h2`
  text-transform: uppercase;
  font-size: 1.125rem;
  letter-spacing: 1px;
  align-self: center;
  margin-bottom: 2rem;
`;

const MessageLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const CategoryName = styled.div`
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
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
  }
`;

function Confirmation({ match, location }) {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { getOrder } = useFirestore();

  console.log(location);
  console.log(match.params.id);

  useEffect(() => {
    (async () => {
      const order = await getOrder(match.params.id);
      setOrder(order);
      setLoading(false);
    })();
  }, []);

  return (
    <Wrapper>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <Main>
          {!loading && (
            <Order>
              <Heading>Order Confirmation</Heading>

              <Summary>
                <CategoryName>Order Summary</CategoryName>

                <ul>
                  {order.products.map((product) => {
                    return (
                      <Product key={product.id}>
                        <Image src={product.image} alt='Product preview'></Image>
                        <div>
                          <Name>{product.name}</Name>
                          <Type>{product.type} in {product.color}</Type>
                        </div>
                        <div>{product.quantity}</div>
                        <Price>£{product.price}</Price>
                      </Product>
                    )
                  })}
                </ul>

                <OrderTotal>
                  <div>Items</div><div>£{order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</div>
                  <div>Shipping</div><div>0</div>
                  <Total>Total</Total><Total>£{order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</Total>
                </OrderTotal>
              </Summary>

              <div>
                <CategoryName>Shipping Details</CategoryName>
                {order.shipping.firstName} {order.shipping.lastName}
                <br />
                {order.shipping.address}
                <br />
                {order.shipping.zipCode} {order.shipping.city}
                <br />
                {order.shipping.country}
              </div>
            </Order>
          )}

          <Message>
            <MessageHeading>Confirmation</MessageHeading>

            <p>
              Your order n°<strong>{match.params.id}</strong> has been
              confirmed. You will be receiving a confirmation mail with your
              order details shortly.
            </p>

            <p>
              You can follow your order's status at any given time{' '}
              <MessageLink>
                <Link to='/'>here</Link>
              </MessageLink>
              . If you have any other questions, feel free to{' '}
              <MessageLink>
                <Link to='/contact'>contact us.</Link>
              </MessageLink>
            </p>

            <p>Thank you for shopping with us!</p>

            <Button>
              <Link to='/shop'>Continue Shopping</Link>
            </Button>
          </Message>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default Confirmation;
