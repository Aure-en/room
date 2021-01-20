import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Images
import hero_1 from '../assets/images/desktop-image-hero-1.jpg';
import hero_2 from '../assets/images/desktop-image-hero-2.jpg';
import hero_3 from '../assets/images/desktop-image-hero-3.jpg';
import { ReactComponent as AngleLeft } from '../assets/icons/icon-angle-left.svg';
import { ReactComponent as AngleRight } from '../assets/icons/icon-angle-right.svg';

const colors = {
  black: 'hsl(0, 0%, 0%)',
  darkGrey: 'hsl(0, 0%, 27%)',
};

const size = `
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media all and (max-width: 600px) {
    flex-direction: column;
  }
`;

const CarouselComponent = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 100%;
`;

const Slider = styled.div`
  ${size}
`;

const Images = styled.div`
  ${size}
  transform: translateX(${(props) => props.transition}%);
  transition: transform ${(props) => props.transitionDuration}s ease-in;
  display: flex;
`;

const Menu = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  bottom: 0;

  @media all and (max-width: 1170px) {
    left: initial;
    right: 0;
  }
`;

const Button = styled.button`
  background: ${colors.black};
  padding: 1.5rem 2rem;
  cursor: pointer;
  color: #fff;

  &:hover {
    background: ${colors.darkGrey};
  }
`;

const Image = styled.img`
  width: 100vw;
  border: 1px solid red;
`;

function ImageCarousel() {
  const images = [hero_1, hero_2, hero_3];
  const [slides, setSlides] = useState([...images]);
  const [transition, setTransition] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0.3);

  // Functions
  const next = () => {
    setTransition((prev) => prev - 100);
  };

  const previous = () => {
    setTransition((prev) => prev + 100);
  };

  /* At the end of each transition:
  - The transition duration is set to 0. It allows us to silently reset transform: translateX to 0.
  - The slides order is changed so that there is always a "previous slide" and a "next slide" to go to without jumping too far.
  - Thanks to useEffect, the transition duration is put back to 0.3s to have a smooth animation.
  */
  const handleTransitionEnd = () => {
    setTransitionDuration(0);
    setTransition(0);
    setSlides((prev) => {
      const slides = [...prev];
      const prevSlide = slides.shift();
      slides.push(prevSlide);
      return slides;
    });
  };

  useEffect(() => {
    if (transitionDuration === 0) {
      setTransitionDuration(0.3);
    }
  }, [transitionDuration]);

  return (
    <Container>
      <CarouselComponent>
        <Slider>
          <Images
            onTransitionEnd={handleTransitionEnd}
            transition={transition}
            transitionDuration={transitionDuration}
          >
            {slides.map((image, index) => {
              return <Image key={index} src={image} alt='Hero' />;
            })}
          </Images>
        </Slider>
        <Menu>
          <Button type='button' onClick={previous}>
            <AngleLeft />
          </Button>
          <Button type='button' onClick={next}>
            <AngleRight />
          </Button>
        </Menu>
      </CarouselComponent>
    </Container>
  );
}

export default ImageCarousel;
