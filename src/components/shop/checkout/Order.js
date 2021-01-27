import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../hooks/useCart';
import { Link } from 'react-router-dom';

const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Darker grey - for background
  text: 'hsl(0, 0%, 95%)',
  white: 'hsl(0, 0%, 100%)',
  small: 'hsl(0, 0%, 85%)',
  accent: 'hsl(46, 65%, 52%)', // Gold
};

const Container = styled.div`
  margin-left: 5rem;
  background: ${colors.secondary};
  color: ${colors.text};
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Cart = styled.div`
  line-height: 1.25rem;
  width: 100%;
`;

const Heading = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-row-gap: 1rem;

  &:after {
    content: '';
    grid-column: 1 / -1;
    width: 100%;
    height: 1px;
    margin-bottom: 1rem;
    background: ${colors.primary};
    background: linear-gradient(
      90deg,
      ${colors.secondary} 0%,
      ${colors.accent} 40%,
      ${colors.accent} 60%,
      ${colors.secondary} 100%
    );
  }
`;

const Name = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Type = styled.div`
  font-style: italic;
  color: ${colors.small};
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const Quantity = styled.div`
  font-size: 0.9rem;
  justify-self: end;
`;

const Price = styled.div`
  grid-column: -2;
  font-weight: 600;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin: .5rem 0;
`;

const Total = styled.div`
  margin: 1.5rem 0;
`;

const TotalLabel = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  color: ${colors.accent};
`;

const TotalPrice = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
`;

const GoBack = styled.div`
  &:hover {
    color: ${colors.white};
  }
`;

function Order() {
  const [cart, setCart] = useState([]);
  const { getCart } = useCart();
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const cart = await getCart(currentUser.uid);
      setCart(cart);
    })();
  }, []);

  return (
    <Container>
      <Heading>Order Summary</Heading>
      <Cart>
        <ul>
          {cart.map((item) => {
            return (
              <Item key={item.id}>
                <div>
                  <Name>{item.name}</Name>
                  <Type>
                    {item.type} in {item.color.description}
                  </Type>
                  {item.options.map((option) => {
                    return (
                      <div option={option} key={Object.keys(option)[0]}>
                        <Capitalize>{Object.keys(option)[0]}</Capitalize> -{' '}
                        {option[Object.keys(option)[0]].option}
                      </div>
                    );
                  })}
                </div>
                <Quantity>{item.quantity}</Quantity>
                <Price>£{item.price}</Price>
              </Item>
            );
          })}
        </ul>
        <Row>
          <div>Items</div>
          <Price>£{cart.reduce((sum, item) => sum + +item.price, 0)}</Price>
        </Row>
        <Row>
          <div>Shipping</div>
          <Price>£0</Price>
        </Row>
        <Total>
          <Row>
            <TotalLabel>Total</TotalLabel>
            <TotalPrice>
              £{cart.reduce((sum, item) => sum + +item.price, 0)}
            </TotalPrice>
          </Row>
        </Total>
      </Cart>

      <GoBack>
        <Link to='/shop/cart'>← Edit your cart</Link>
      </GoBack>
    </Container>
  );
}

export default Order;
