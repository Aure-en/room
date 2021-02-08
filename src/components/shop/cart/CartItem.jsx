import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import useCart from "../../../hooks/useCart";

// Icon
import { ReactComponent as Delete } from "../../../assets/icons/icon-x-med.svg";

// Styled Components
const colors = {
  primary: "hsl(0, 0%, 45%)", // Grey
  secondary: "hsl(0, 0%, 15%)", // Dark Grey
  tertiary: "hsl(0, 0%, 55%)", // Bright Grey
  border: "hsl(0, 0%, 90%)",
};

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid ${colors.border};
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.125rem;
  padding: 1rem 0;
  width: 15rem;

  @media all and (min-width: 576px) {
    width: 20rem;
  }
`;

const Image = styled.img`
  width: 7rem;
  height: 7rem;
  margin-right: 1rem;
  object-fit: cover;

  @media all and (min-width: 576px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Name = styled.div`
  text-transform: uppercase;
`;

const Price = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${colors.secondary};
`;

const Type = styled.span`
  font-size: 0.9rem;
  color: ${colors.primary};
`;

const Option = styled.span`
  font-size: 0.9rem;
  color: ${colors.tertiary};
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (min-width: 600px) {
    flex-direction: row;
  }
`;

const QuantityInput = styled.input`
  font-family: "Source Sans Pro", sans-serif;
  width: 2rem;
  height: 2rem;
  text-align: center;
`;

const Button = styled.button`
  font-size: 1.25rem;
  color: ${colors.primary};
  cursor: pointer;

  &:hover {
    color: initial;
  }
`;
function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { currentUser } = useAuth();
  const { deleteFromCart, updateCartQuantity } = useCart();

  useEffect(() => {
    updateCartQuantity(currentUser.uid, item.id, quantity);
  }, [quantity]);

  return (
    <Item>
      <Information>
        <Image src={item.image} alt="Item preview" />
        <div>
          <Name>
            <Link to={`/shop/item/${item.id}`}>{item.name}</Link>
          </Name>
          <Type>
            {item.type} -{item.color.description}
          </Type>
          <div>
            {item.options.map((option) => {
              return (
                <Option option={option} key={Object.keys(option)[0]}>
                  <Capitalize>{Object.keys(option)[0]}</Capitalize> -{" "}
                  {option[Object.keys(option)[0]].option}
                </Option>
              );
            })}
          </div>
          <Price>£{item.price}</Price>
        </div>
      </Information>

      <Quantity>
        <Button
          onClick={() => setQuantity((prev) => (+prev < 2 ? "1" : prev - 1))}
        >
          -
        </Button>
        <QuantityInput
          value={quantity}
          onChange={(e) => {
            let quantity = e.target.value.replace(/[^0-9]/g, "");
            if (+quantity < 1 || !quantity) quantity = "1";
            setQuantity(quantity);
          }}
        />
        <Button onClick={() => setQuantity((prev) => +prev + 1)}>+</Button>
      </Quantity>
      <Price>£{item.price * quantity}</Price>
      <Button onClick={() => deleteFromCart(currentUser.uid, item.id)}>
        <Delete />
      </Button>
    </Item>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    image: PropTypes.string,
    color: PropTypes.shape({
      description: PropTypes.string,
    }),
    options: PropTypes.object,
  }).isRequired,
};

export default CartItem;
