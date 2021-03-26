import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../../contexts/AuthContext";
import useOrder from "../../../hooks/useOrder";
import Order from "../../../components/account/Order";

function Orders() {
  const { currentUser } = useAuth();
  const { getOrders } = useOrder();
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
        {orders.map((order) => {
          return <Order order={order} key={order.id} />;
        })}
      </div>
    </div>
  );
}

export default Orders;

const Heading = styled.h1`
  margin-left: 2rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: "Playfair Display", sans-serif;

  @media all and (min-width: 500px) {
    margin-left: 0;
  }
`;
