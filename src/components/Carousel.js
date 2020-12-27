import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Images
import hero_1 from '../images/desktop-image-hero-1.jpg';
import hero_2 from '../images/desktop-image-hero-2.jpg';
import hero_3 from '../images/desktop-image-hero-3.jpg';
import angle_left from '../images/icon-angle-left.svg';
import angle_right from '../images/icon-angle-right.svg';

const colors = {
  black: 'hsl(0, 0%, 0%)',
  darkGrey: 'hsl(0, 0%, 27%)',
};

const size = `
width: 100%;
height: 100%;
`

const CarouselComponent = styled.div`
  position: relative;
  max-width: 840px;
  max-height: 534px;
  min-width: 0;
  height: 100%;
`;

const Container = styled.div`
  ${size}
  overflow: hidden;
`;

const Images = styled.div`
  ${size}
  transform: translateX(-100%);
  transition: transform .3s ease-in;
  display: flex;
`;

const Menu = styled.div`
  position: absolute;
  display: flex;
  left: 100%;
  bottom: 0;

  @media all and (max-width: 576px) {
    left: initial;
    right: 0;
  }
`;

const Button = styled.button`
  background: ${colors.black};
  padding: 1.5rem 2rem;
  cursor: pointer;

  &:hover {
    background: ${colors.darkGrey};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

function Carousel() {

  // Duplicate the first and last images for smooth transitions.
  const images = [
    hero_3, // Last image duplicate
    hero_1, // First image
    hero_2,
    hero_3,
    hero_1, // First image duplicate
  ];

  const [currentImage, setCurrentImage] = useState(1);
  const [currentTransition, setCurrentTransition] = useState(-100)
  const imagesRef = useRef();

  // Functions
  const next = () => {
    imagesRef.current.style.transform = `translateX(${currentTransition - 100}%)`;
    setCurrentImage(prev => prev + 1);
    setCurrentTransition(prev => prev - 100);
  };

  const previous = () => {
    imagesRef.current.style.transform = `translateX(${currentTransition + 100}%)`;
    setCurrentImage(prev => prev - 1);
    setCurrentTransition(prev => prev + 100);
  };

  return (
    <CarouselComponent>
      <Container>
        <Images ref={imagesRef}>
          {images.map((image, index) => {
            return <Image key={index} src={image} alt='Hero' />;
          })}
        </Images>
      </Container>
      <Menu>
        <Button type='button' onClick={previous}>
          <img src={angle_left} alt='Previous' />
        </Button>
        <Button type='button' onClick={next}>
          <img src={angle_right} alt='Next' />
        </Button>
      </Menu>
    </CarouselComponent>
  );
}

export default Carousel;
