import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import ShopItemPreview from '../../../components/shop/items/ShopItemPreview';
import { useFavorite } from '../../../contexts/FavoriteContext';
import { useFirestore } from '../../../hooks/useFirestore';
import { Link } from 'react-router-dom';

// Icons
import { ReactComponent as Basket } from '../../../assets/icons/icon-basket.svg';

// Styled Components
const colors = {
  button: 'hsl(0, 0%, 27%)', // Darker grey
  text: 'hsl(0, 0%, 95%)', // White
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 5rem;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const ItemsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3vw;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.div`
  font-family: 'Playfair Display', sans-serif;
  font-size: 1.125rem;
`;

const Button = styled.button`
  margin-top: 2.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
  background: ${colors.button};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

function Favorite() {
  const { getItem } = useFirestore();
  const { favorites } = useFavorite([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    (async () => {
      const favoritesItems = [];
      for (const favorite of favorites) {
        const item = await getItem(favorite);
        favoritesItems.push(item);
      }
      setFavoriteItems(favoritesItems);
    })();
  }, [favorites]);

  return (
    <Wrapper>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <div>
          {favorites.length === 0 ? (
            <Empty>
              <Heading>Favorites</Heading>
              <Basket />
              <EmptyText>It seems that you haven't saved any items yet.</EmptyText>
              <div>We have a lot of lovely ideas to help you fill it.</div>
              <Link to='/shop'><Button>Inspire Me</Button></Link>
            </Empty>
          ) : (
            <>
              <Heading>Favorites</Heading>
              <ItemsList>
                {favoriteItems.map((item) => {
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
                  );
                })}
              </ItemsList>
            </>
          )}
        </div>
      </Container>
    </Wrapper>
  );
}

export default Favorite;
