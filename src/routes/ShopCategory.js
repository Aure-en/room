import React, { useEffect } from 'react'
import Nav from '../components/shop/Nav';
import ShopNav from '../components/shop/ShopNav';
import { useFirestore } from '../contexts/FirestoreContext';

function ShopCategory() {

  const { getShopItems } = useFirestore();

  useEffect(() => {
    getShopItems();
  }, [])

  return (
    <div>
      <Nav />
      <ShopNav />
    </div>
  )
}

export default ShopCategory
