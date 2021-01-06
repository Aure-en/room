import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 45%)', // Grey
  tertiary: 'hsl(0, 0%, 70%)' // Bright grey
};

const Container = styled.div`
  padding: 2rem;
  border: 1px solid transparent;
  
  &:hover {
    border: 1px solid ${colors.tertiary};
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-bottom: .5rem;
`;

const Name = styled.div`
  text-transform: uppercase;
  font-size: .825rem;
`;

const Price = styled.div`
  color: ${colors.secondary};
  font-size: .825rem;
`;

function ShopItemPreview({ name, images, price, id }) {
  const [image, setImage] = useState(images[0]);

  const changeImage = () => {
    if (images.length === 1) return;
    image === images[0] ? setImage(images[1]) : setImage(images[0]);
  };

  return (
    <Container>
      <Link to={`/shop/item/${id}`}>
        <Image
          src={image}
          onMouseOver={changeImage}
          onMouseLeave={changeImage}
        />
      </Link>
      <Link to={`/shop/item/${id}`}>
        <Name>{name}</Name>
      </Link>
      <Price>£{price}</Price>
    </Container>
  );
}

export default ShopItemPreview;
