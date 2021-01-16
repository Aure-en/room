import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useFirestore } from '../../../hooks/useFirestore';
import styled from 'styled-components';
import Order from '../../../components/shop/account/Order';

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

function Orders() {
  const { currentUser } = useAuth();
  const { getOrders } = useFirestore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const orders = await getOrders(currentUser.uid);
      setOrders(orders);
    })();
  }, []);

  return (
    <div>
      <Heading>Orders</Heading>
        <div>
          {orders.map(order => {
            return (
              <Order order={order} key={order.id}/>
          )})}
        </div>
    </div>
  );
}

export default Orders;
