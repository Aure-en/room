import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { Link } from 'react-router-dom';

// Icon
import { ReactComponent as Delete } from '../../assets/icons/icon-x-med.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 15%)', // Dark Grey
  tertiary: 'hsl(0, 0%, 55%)', // Bright Grey
  border: 'hsl(0, 0%, 90%)'
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
  width: 20rem;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  margin-right: 1rem;
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

const Quantity = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
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
  const { deleteFromCart, updateCartQuantity } = useFirestore();

  useEffect(() => {
    updateCartQuantity(currentUser.uid, item.id, quantity)
  }, [quantity])

  return (
    <Item key={item.id}>
      <Information>
        <Image src={item.image} alt='Item preview' />
        <div>
          <Name><Link to={`/shop/item/${item.id}`}>{item.name}</Link></Name>
          <Type>
            {item.type} - {item.color}
          </Type>
          <div>
            {item.options.map((option) => {
              return (
                <>
                  <Option>
                    <Capitalize>{Object.keys(option)[0]}</Capitalize> -{' '}
                    {Object.values(option)[0]}
                  </Option>
                </>
              );
            })}
          </div>
        </div>
      </Information>
      <Price>£{item.price}</Price>

      <div>
        <Button
          onClick={() => setQuantity((prev) => (+prev < 2 ? '1' : prev - 1))}
        >
          -
        </Button>
        <Quantity
          value={quantity}
          onChange={(e) => {
            let quantity = e.target.value.replace(/[^0-9]/g, '');
            if (+quantity < 1 || !quantity) quantity = '1';
            setQuantity(quantity);
          }}
        />
        <Button onClick={() => setQuantity((prev) => +prev + 1)}>
          +
        </Button>
      </div>
      <Price>£{item.price * quantity}</Price>
      <Button onClick={() => deleteFromCart(currentUser.uid, item.id)}><Delete/></Button>
    </Item>
  );
}

export default CartItem;
