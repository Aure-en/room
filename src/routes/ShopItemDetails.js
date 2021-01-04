import React, { useState, useEffect } from 'react';
import ImageMagnifier from '../components/shop/ImageMagnifier';
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
        <ImageMagnifier image={item.images[1]} />
      }
    </div>
  )
}

export default ShopItemDetails
