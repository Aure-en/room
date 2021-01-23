import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// Images
import { ReactComponent as AngleLeft } from '../assets/icons/icon-angle-left.svg';
import { ReactComponent as AngleRight } from '../assets/icons/icon-angle-right.svg';
import { ReactComponent as Arrow } from '../assets/icons/icon-small-arrow.svg';

const colors = {
  arrow: 'hsl(0, 0%, 100%)',
  button: 'hsl(0, 0%, 27%)',
  buttonHover: 'hsl(0, 0%, 5%)',
  text: 'hsl(0, 0%, 0%)'
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  height: 80vh;
`;

const CarouselComponent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  position: absolute;
  left: 15%;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.arrow};
  font-size: 1.75rem;
  line-height: 3.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 3.75rem;
  letter-spacing: 6px;
`;

const ShopButton = styled.span`
  background: ${colors.arrow};
  padding: 0 1rem;
  margin-top: .5rem;
  color: ${colors.button};
  text-transform: uppercase;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
`;

const ImageButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;

  & > * {
    margin-left: 0.5rem;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;

const ImageButton = styled.button`
  color: ${colors.arrow};
  font-family: 'Playfair Display', sans-serif;
  font-size: ${(props) => (props.isSelected ? '1.25rem' : '1.125rem')};
  opacity: ${(props) => (props.isSelected ? '1' : '.75')};
  cursor: pointer;

  &:hover {
    font-size: ${(props) => !props.isSelected && '1.25rem'};
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${colors.button};
  padding: 1.5rem 1rem;
  cursor: pointer;
  color: ${colors.text};

  &:hover {
    background: ${colors.buttonHover};
  }
`;

const ButtonLeft = styled(Button)`
  left: 0;
`;

const ButtonRight = styled(Button)`
  right: 0;
`;

const Image = styled.img`
  width: 100vw;
  object-fit: cover;
  height: 100%;
  filter: brightness(70%);
`;

function FullCarousel() {
  const images = [
    'https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/images%2Fshop%2Fshop_main_1.jpg?alt=media&token=6955b061-b35e-445a-9c2f-7ea1b7389612',
    'https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/images%2Fshop%2Fshop_main_2.jpg?alt=media&token=6c2dfbbc-116b-4488-bd9b-c8001a4bc1a3',
  ];
  const text = [
    {
      title: 'New Arrivals',
      text: 'Discover our new furnitures and decorations.',
      link: '/shop/new_in',
    },
    {
      title: 'Featured Look',
      text: "Discover our designers' seasonal creation.",
      link: '/shop#featured',
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Functions
  const next = () => {
    currentSlide === images.length - 1 ? setCurrentSlide(0) : setCurrentSlide((prev) => prev + 1);
    setIsChanging(true);
  };

  const previous = () => {
    currentSlide === 0 ? setCurrentSlide(images.length + 1) : setCurrentSlide((prev) => prev - 1);
    setIsChanging(true);
  };

  return (
    <Container>
      <CarouselComponent>
        <CSSTransition
          in={isChanging}
          timeout={500}
          classNames='fade'
          onEntered={() => setIsChanging(false)}
        >
          <>
            <Image src={images[currentSlide]} alt='Hero' />
            <Text>
              <Title>{text[currentSlide].title}</Title>
              <div>{text[currentSlide].text}</div>
              <Link to={text[currentSlide].link}>
                <ShopButton>Shop now <Arrow /></ShopButton>
              </Link>
            </Text>
          </>
        </CSSTransition>

        <ButtonLeft type='button' onClick={previous}>
          <AngleLeft />
        </ButtonLeft>
        <ButtonRight type='button' onClick={next}>
          <AngleRight />
        </ButtonRight>

        <ImageButtons>
          {images.map((image, index) => (
            <ImageButton
              onClick={() => {
                setCurrentSlide(index);
                setIsChanging(true);
              }}
              isSelected={currentSlide === index}
            >
              {index + 1}
            </ImageButton>
          ))}
        </ImageButtons>
      </CarouselComponent>
    </Container>
  );
}

export default FullCarousel;
