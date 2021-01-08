import React, { useState, useEffect } from 'react'
import Nav from '../../components/shop/Nav';
import ShopNav from '../../components/shop/ShopNav';
import ShopItemPreview from '../../components/shop/ShopItemPreview';
import { useFirestore } from '../../contexts/FirestoreContext';
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

  useEffect(() => {
    (async () => {
      const itemsList = await getCategoryItems(decodeURIComponent(match.params.category));
      setItems(itemsList);
    })();
  }, [match])

  return (
    <div>
      <header>
        <Nav />
        <ShopNav />
      </header>
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
