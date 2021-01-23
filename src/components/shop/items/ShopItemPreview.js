import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFavorite } from '../../../contexts/FavoriteContext';
import { useAuth } from '../../../contexts/AuthContext';

// Icons
import { ReactComponent as Heart } from '../../../assets/icons/icon-heart.svg';
import { ReactComponent as HeartFilled } from '../../../assets/icons/icon-heart-filled.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 45%)', // Grey
  tertiary: 'hsl(0, 0%, 70%)', // Bright grey
  quaternary: 'hsl(0, 0%, 27%)',
  new: 'hsl(0, 0%, 85%)',
};

const Container = styled.div`
  position: relative;
  padding: 2.5rem;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${colors.tertiary};
  }
`;

const New = styled.span`
  position: absolute;
  font-size: 0.825rem;
  text-transform: uppercase;
  color: ${colors.new};
  background: ${colors.quaternary};
  padding: 0.2rem 0.35rem;
  border-radius: 2px;
  top: 0.5rem;
  left: 0.5rem;
`;

const ImageContainer = styled.div`
  margin-bottom: 0.5rem;
  min-width: 12.5rem;
  min-height: 12.5rem;
  width: 10vw;
  height: 10vw;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  text-transform: uppercase;
  font-size: 0.825rem;
`;

const Price = styled.div`
  color: ${colors.secondary};
  font-size: 0.825rem;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.span`
  color: ${colors.secondary};
  cursor: pointer;
`;

function ShopItemPreview({ name, images, price, id, isFavorite, isNew }) {
  const [image, setImage] = useState(images[0]);
  const { addFavorite, deleteFavorite } = useFavorite();
  const { currentUser, signInAnonymously } = useAuth();

  const changeImage = () => {
    if (images.length === 1) return;
    image === images[0] ? setImage(images[1]) : setImage(images[0]);
  };

  const handleFavorite = async () => {
    let userId = currentUser && currentUser.uid;

    if (!currentUser) {
      const user = await signInAnonymously();
      userId = user.user.uid;
    }
    isFavorite ? deleteFavorite(userId, id) : addFavorite(userId, id);
  };

  return (
    <Container>
      <Link to={`/shop/item/${id}`}>
        {isNew && <New>New</New>}
        <ImageContainer>
          <Image
            src={image}
            onMouseOver={changeImage}
            onMouseLeave={changeImage}
          />
        </ImageContainer>
      </Link>
      <Description>
        <div>
          <Link to={`/shop/item/${id}`}>
            <Name>{name}</Name>
          </Link>
          <Price>£{price}</Price>
        </div>
        <Icon onClick={handleFavorite}>
          {isFavorite ? <HeartFilled /> : <Heart />}
        </Icon>
      </Description>
    </Container>
  );
}

export default ShopItemPreview;
