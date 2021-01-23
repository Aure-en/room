import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

  @media all and (max-width: 600px) {
    flex-direction: column;
  }
`;

const CarouselComponent = styled.div`
  position: relative;
  max-width: 840px;
  max-height: 534px;
  min-width: 0;
  height: 100%;
`;

const Slider = styled.div`
  ${size}
  overflow: hidden;
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
  left: 100%;
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
  width: 100%;
  object-fit: cover;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const Card = styled.div`
  max-width: 70%;
  min-width: 450px;
  padding: 2rem;
  transition: all 0.25s ease-in-out;

  @media all and (max-width: 576px) {
    min-width: 0;
    padding: 1rem;
  }
`;

const ShopLink = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  font-weight: 300;
  font-size: 1.25rem;
  margin-top: 2rem;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: ${colors.grey};
  }
`;

const Text = styled.p`
  line-height: 1.25rem;
  color: ${colors.grey};
`;

const Arrow = styled.svg`
  margin-left: 2rem;
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 300;
  margin-bottom: 2rem;
`;

function Carousel() {
  const images = [hero_1, hero_2, hero_3];

  const text = [
    {
      title: 'Discover innovative ways to decorate',
      description:
        'We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.',
    },
    {
      title: 'We are available all across the globe',
      description:
        "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    },
    {
      title: 'Manufactured with the best materials',
      description:
        'Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.',
    },
  ];

  const cardRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([images[images.length - 1], ...images]);
  const [transition, setTransition] = useState(-100);
  const [transitionDuration, setTransitionDuration] = useState(0.3);
  const [isNext, setIsNext] = useState(false); // Indicates the carousel direction (previous/next)

  // Functions
  const next = () => {
    setIsNext(true);
    setTransition((prev) => prev - 100);
    setCurrentSlide((prev) => {
      return prev === images.length - 1 ? 0 : prev + 1;
    });
    cardRef.current.classList.add('active');
  };

  const previous = () => {
    setIsNext(false);
    setTransition((prev) => prev + 100);
    setCurrentSlide((prev) => {
      return prev === 0 ? images.length - 1 : prev - 1;
    });
    cardRef.current.classList.add('active');
  };

  /* At the end of each transition:
  - The transition duration is set to 0. It allows us to silently reset transform: translateX to 0.
  - The slides order is changed so that there is always a "previous slide" and a "next slide" to go to without jumping too far.
  - Thanks to useEffect, the transition duration is put back to 0.3s to have a smooth animation.
  */
  const handleTransitionEnd = () => {
    setTransitionDuration(0);
    setTransition(-100);

    if (isNext) {
      setSlides((prev) => {
        const slides = [...prev];
        slides.pop();
        const prevSlide = slides.shift();
        slides.push(prevSlide);
        slides.push(slides[0]);
        return slides;
      });
    } else {
      setSlides((prev) => {
        const slides = [...prev];
        slides.shift();
        const lastSlide = slides.pop();
        slides.unshift(lastSlide);
        slides.unshift(slides[slides.length - 1]);
        return slides;
      })
    }
    cardRef.current.classList.remove('active');
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

      <Center>
        <Card ref={cardRef}>
          <Title>{text[currentSlide].title}</Title>
          <Text>{text[currentSlide].description}</Text>
          <Link to='/shop'>
            <ShopLink>
              Shop now
              <Arrow width='40' height='12' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z'
                  fill='currentColor'
                  fillRule='nonzero'
                />
              </Arrow>
            </ShopLink>
          </Link>
        </Card>
      </Center>
    </Container>
  );
}

export default Carousel;
