import React, { useState, useEffect } from 'react'
import ShopItemPreview from '../../components/shop/items/ShopItemPreview';
import { useFirestore } from '../../hooks/useFirestore';
import { useFavorite } from '../../contexts/FavoriteContext';
import styled from 'styled-components'

const ShopList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 80%;
  grid-gap: 3vw;
`

const Shop = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
`;

function Category({ match }) {

  const [items, setItems] = useState([])
  const { getCategoryItems } = useFirestore();
  const { favorites } = useFavorite();

  // Loads items
  useEffect(() => {
    (async () => {
      const itemsList = await getCategoryItems(decodeURIComponent(match.params.category));
      setItems(itemsList);
    })();
  }, [match])

  return (
    <div>
      <Shop>
        <ShopList>
        {
          items.map(item => {
            return (
              <li key={item.id}>
                <ShopItemPreview 
                  name={item.name}
                  images={item.images}
                  price={item.price}
                  id={item.id}
                  isFavorite={favorites.includes(item.id)}
                />
              </li>
            )
          })
        }
        </ShopList>
      </Shop>
    </div>
  )
}

export default Category
