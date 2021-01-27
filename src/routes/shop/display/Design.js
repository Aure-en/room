import React, { useState, useEffect } from 'react';
import { useDesign } from '../../../hooks/useDesign';
import { useShop } from '../../../hooks/useShop';
import { useFavorite } from '../../../contexts/FavoriteContext';
import styled from 'styled-components';
import ShopItemPreview from '../../../components/shop/display/ShopItemPreview';

const colors = {
  primary: 'hsl(0, 0%, 27%)', // Grey
  secondary: 'hsl(0, 0%, 40%)',
  background: 'hsl(0, 0%, 100%)',
  accent: 'hsl(46, 65%, 52%)', // Gold
};

const Container = styled.div`
  padding: 5rem 0;
  max-width: 80%;
`;

const ShopList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-template-columns: repeat(3, 1fr);
  grid-gap: 3vw;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  @media all and (min-width: 900px) {
    width: 40rem;
    height: 25rem;
  }

  @media all and (min-width: 1000px) {
    width: 50rem;
    height: 35rem;
  }
`;

const Presentation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:first-child {
    margin-bottom: 5rem;
  }

  @media all and (min-width: 1000px) {
    margin-bottom: 7.5rem;
  }
`;

const Heading = styled.h2`
  color: ${colors.dark};
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.5rem;
`;

const Decoration = styled.span`
  display: flex;
  align-items: center;
  align-self: center;
  color: ${colors.accent};
  margin: 1rem 0;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    margin: 0 1rem;
    height: 1px;
    width: 5rem;
    background: ${colors.accent};
    background: linear-gradient(270deg, transparent, ${colors.accent});
  }

  &:before {
    background: linear-gradient(270deg, ${colors.accent}, transparent);
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  opacity: .95;
  color: ${colors.secondary};
  max-width: 25rem;
  border: 5px solid ${colors.primary};
  outline: 2px solid ${colors.primary};
  outline-offset: 5px;
  padding: 3rem;
  line-height: 1.5rem;
  text-align: justify;

  & > p {
    margin-bottom: 1rem;
  }

  & > p:last-child {
    margin-bottom: 0;
  }

  @media all and (min-width: 1000px) {
    position: absolute;
    bottom: -5rem;
    right: -5rem;
  }
`;

function Design({ match }) {
  const [design, setDesign] = useState();
  const [items, setItems] = useState([]);
  const { favorites } = useFavorite();
  const { getDesign } = useDesign();
  const { getItem } = useShop();

  useEffect(() => {
    (async () => {
      const design = await getDesign(match.params.id);
      setDesign(design);

      const items = [];
      for (const itemId of design.items) {
        const item = await getItem(itemId);
        items.push(item);
      }
      setItems(items);
    })();
  }, []);

  return (
    <Container>
      {design && (
        <>
          <Presentation>
            <ImageContainer>
              <Image src={design.image} alt={design.name} />
            </ImageContainer>

            <Text>
              <Heading>{design.name}</Heading>
              <Decoration>⬧</Decoration>
              {design.description.map(paragraph => {
                return (
                  <p>{paragraph}</p>
                )
              })}
            </Text>
          </Presentation>

          <ShopList>
            {items.map(item => {
              return (
                <ShopItemPreview
                  name={item.name}
                  images={item.images}
                  price={item.price}
                  id={item.id}
                  isFavorite={favorites.includes(item.id)}
                  isNew={item.new}
                />
              )
            })}
          </ShopList>
        </>
      )}
    </Container>
  );
}

export default Design;
