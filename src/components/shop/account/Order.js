import React, { useState } from 'react';
import CartPreview from '../cart/CartPreview';
import styled from 'styled-components';

// Icons
import { ReactComponent as Plus } from '../../../assets/icons/icon-plus.svg';
import { ReactComponent as Minus } from '../../../assets/icons/icon-minus.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Dark Grey
  tertiary: 'hsl(0, 0%, 70%)', // Bright Grey
  text: 'hsl(0, 0%, 85%)',
  label: 'hsl(0, 0%, 100%)',
};

const Container = styled.div`
  min-width: 50vw;
  margin-bottom: 3rem;
  border: 1px solid ${colors.text};
  border-radius: 5px;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto) 1fr auto;
  grid-column-gap: 3rem;
  background: ${colors.secondary};
  padding: 0.75rem 1rem;
  color: ${colors.text};
  line-height: 1.125rem;
  border-radius: 5px 5px 0 0;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  align-self: center;
  grid-column: -1;
  cursor: pointer;

  &:hover {
    color: ${colors.label};
  }
`;

const Category = styled.div`
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
  margin-bottom: 1.25rem;
`;

const Subheading = styled.div`
  display: inline-block;
  text-transform: uppercase;
  color: ${colors.secondary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Type = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.label};
`;

const Dropdown = styled.div`
  margin: 2rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

function Order({ order }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const getDate = (time) => {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Container>
      <Top>
        <div>
          <Type>Order</Type>
          <div>{order.id}</div>
        </div>

        <div>
          <Type>Date</Type>
          <div>{getDate(order.date.seconds * 1000)}</div>
        </div>

        <div>
          <Type>Total:</Type>
          <div>
            {order.products.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </div>
        </div>

        <div>
          <Type>Deliver to:</Type>
          <div>
            {order.shipping.firstName} {order.shipping.lastName}
          </div>
        </div>

        <div>
          <Type>Status</Type>
          <div>{order.status}</div>
        </div>

        <Icon onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {isDropdownOpen ? <Minus /> : <Plus />}
        </Icon>
      </Top>

      {isDropdownOpen && (
        <Dropdown>
          <div>
            <Category>Items</Category>
            <CartPreview cart={order.products} />
          </div>

          <div>
            <Category>Informations</Category>
            <Row>
              <div>
                <Subheading>Shipping</Subheading>
                <div>
                  <div>
                    {order.shipping.firstName} {order.shipping.lastName}
                  </div>
                  <div>{order.shipping.address}</div>
                  <div>
                    {order.shipping.zipCode} {order.shipping.city}
                  </div>
                  <div>{order.shipping.country}</div>
                </div>
              </div>
              <div>
                <Subheading>Payment</Subheading>
                <div>
                  <div>Paid by card</div>
                  <div>{order.card.name}</div>
                  <div>{order.card.number.slice(-4)} (Last 4 digits)</div>
                </div>
              </div>
            </Row>
          </div>
        </Dropdown>
      )}
    </Container>
  );
}

export default Order;
