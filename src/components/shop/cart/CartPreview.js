import React from 'react'
import styled from 'styled-components'

const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Darker grey - background
  tertiary: 'hsl(0, 0%, 0%)', // Black
};

const Container = styled.div`
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

const Review = styled.div`
  display: grid;
  align-self: flex-end;
  grid-template-columns: repeat(2, auto);
  grid-gap: .5rem 1.5rem;
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

const Total = styled.div`
  color: ${colors.tertiary};
  font-weight: 600;
`;

function CartPreview({ cart }) {
  return (
    <Container>
      <ul>
        {cart.map((product) => {
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

      <Review>
        <div>Items</div><div>£{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</div>
        <div>Shipping</div><div>0</div>
        <Total>Total</Total><Total>£{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</Total>
      </Review>
    </Container>
  )
}

export default CartPreview
