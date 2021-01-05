import React, { useState, useEffect } from 'react';
import ImagesPreview from '../components/shop/ImagesPreview';
import { useFirestore } from '../contexts/FirestoreContext';

function ShopItemDetails({ match }) {

  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(true);
  const { getItem } = useFirestore();

  useEffect(() => {
    (async () => {
      const itemId = match.params.id;
      const item = await getItem(itemId);
      setItem(item);
      setLoading(false);
    })();
  }, [])

  return (
    <div>
      {!loading && 
        <ImagesPreview images={item.images} size={35} />
      }
    </div>
  )
}

export default ShopItemDetails
