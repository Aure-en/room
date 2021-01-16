import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useFirestore } from '../../../hooks/useFirestore';
import styled from 'styled-components';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import AccountNav from '../../../components/shop/account/AccountNav';
import Order from '../../../components/shop/account/Order';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex: 1;
  margin: 5rem;
`;

const OrdersContainer = styled.div`
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const OrdersList = styled.div``;

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
      console.log(orders);
    })();
  }, []);

  return (
    <Wrapper>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <OrdersContainer>
          <AccountNav currentLink={'orders'} />
          <section>
            <Heading>Orders</Heading>
              <OrdersList>
                {orders.map(order => {
                  return (
                    <Order order={order} key={order.id}/>
                )})}
              </OrdersList>
          </section>
        </OrdersContainer>
      </Container>
    </Wrapper>
  );
}

export default Orders;
