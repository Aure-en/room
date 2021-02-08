import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFavorite } from "../../contexts/FavoriteContext";
import ShopItemPreview from "../../components/shop/display/ShopItemPreview";
import useShop from "../../hooks/useShop";

// Icons
import { ReactComponent as Basket } from "../../assets/icons/icon-basket.svg";

// Styled Components
const colors = {
  button: "hsl(0, 0%, 27%)", // Darker grey
  text: "hsl(0, 0%, 95%)", // White
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;

  padding: 5rem 0;

  @media all and (min-width: 600px) {
    padding: 5rem 3rem;
  }
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: "Playfair Display", sans-serif;
`;

const ItemsList = styled.ul`
  display: grid;
  grid-gap: 3vw;

  @media all and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media all and (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media all and (min-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.div`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.125rem;
`;

const Button = styled.button`
  margin-top: 2.5rem;
  font-family: "Source Sans Pro", sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
  background: ${colors.button};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

function Favorite() {
  const { getItem } = useShop();
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
    <Container>
      <div>
        <Heading>Favorites</Heading>
        {favorites.length === 0 ? (
          <Empty>
            <Basket />
            <EmptyText>
              It seems that you haven't saved any items yet.
            </EmptyText>
            <div>We have a lot of lovely ideas to help you fill it.</div>
            <Link to="/shop">
              <Button>Inspire Me</Button>
            </Link>
          </Empty>
        ) : (
          <>
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
  );
}

export default Favorite;
