import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const colors = {
  primary: "hsl(0, 0%, 45%)", // Grey
  secondary: "hsl(0, 0%, 27%)", // Darker grey - background
  tertiary: "hsl(0, 0%, 0%)", // Black
  quaternary: "hsl(0, 0%, 55%)",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Product = styled.li`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 3fr 1fr 1fr;
  align-items: center;

  @media all and (min-width: 500px) {
    grid-gap: 2rem;
  }
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

const Type = styled.div`
  font-size: 0.9rem;
  color: ${colors.primary};
`;

const Option = styled(Type)`
  color: ${colors.quaternary};
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const Review = styled.div`
  display: grid;
  align-self: flex-end;
  grid-template-columns: repeat(2, auto);
  grid-gap: 0.5rem 1.5rem;
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
              <Image src={product.image} alt="Product preview" />
              <div>
                <Name>{product.name}</Name>
                <Type>
                  {product.type}
                  {' '}
                  in
                  {product.color.description}
                </Type>
                {product.options.map((option) => {
                  return (
                    <Option option={option} key={Object.keys(option)[0]}>
                      <Capitalize>{Object.keys(option)[0]}</Capitalize>
                      {' '}
                      -{" "}
                      {option[Object.keys(option)[0]].option}
                    </Option>
                  );
                })}
              </div>
              <div>{product.quantity}</div>
              <Price>£{product.price}</Price>
            </Product>
          );
        })}
      </ul>

      <Review>
        <div>Items</div>
        <div>
          £
{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </div>
        <div>Shipping</div>
        <div>0</div>
        <Total>Total</Total>
        <Total>
          £
{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </Total>
      </Review>
    </Container>
  );
}

CartPreview.propTypes = {
  cart: PropTypes.arrayOf({
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      image: PropTypes.string,
      color: PropTypes.shape({
        description: PropTypes.string,
      }),
      quantity: PropTypes.number,
      price: PropTypes.number,
    }),
  }).isRequired,
};

export default CartPreview;
