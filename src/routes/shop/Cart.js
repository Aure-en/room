import React, { useState, useEffect } from 'react';
import CartItem from '../../components/shop/CartItemsList';
import Nav from '../../components/shop/Nav';
import ShopNav from '../../components/shop/ShopNav';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useAuth } from '../../contexts/AuthContext';

function Cart() {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();
  const { getCart, cartListener } = useFirestore();

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const cart = await getCart(currentUser.uid);
      setCart(cart);
    })();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = cartListener(currentUser.uid, async () => {
      const cart = await getCart(currentUser.uid);
      setCart(cart);
    })
    return unsubscribe;
  }, [])

  return (
    <div>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <section>
        <h1>Shopping Cart</h1>
        <div>
          <ul>
            {cart.map((item) => {
              return (
                <li key={item.id}>
                  <CartItem item={item} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Cart;
