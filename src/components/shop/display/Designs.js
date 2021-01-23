import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Icons
import { ReactComponent as AngleLeft } from '../../../assets/icons/icon-angle-left.svg';
import { ReactComponent as AngleRight } from '../../../assets/icons/icon-angle-right.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/icon-small-arrow.svg';

// Styled components

const colors = {
  background: 'hsl(0, 0%, 100%)',
  button: 'hsl(0, 0%, 50%)',
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1300px;
  margin: 3rem 0;
`;

const Gallery = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 1rem;
  overflow: hidden;

  & > * {
    margin-left: 3rem;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;

const Slides = styled.div`
  display: grid;
  grid-auto-flow: column;
  transition: transform ${(props) => props.transitionDuration}s linear;
  transform: translateX(${(props) => props.transition}%);
  width: ${(props) => (props.slidesNumber - 1) * 100}%;
`;

const Slide = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 3rem;
`;

const Button = styled.button`
  width: 2rem;
  padding: 0;
  cursor: pointer;
  color: ${colors.button};
`;

const Preview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform .25s linear;
  transform: ${props => props.isHovered && 'scale(1.1)'};
`;

const ShopButton = styled.span`
  background: ${colors.background};
  color: ${colors.text};
  text-transform: uppercase;
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`

function Designs({ designs }) {
  const galleryRef = useRef();
  const [slidesNumber, setSlidesNumber] = useState(3);
  const [transition, setTransition] = useState(-100 / (slidesNumber - 1));
  const [slidesGroups, setSlidesGroups] = useState([]);
  const [transitionDuration, setTransitionDuration] = useState(0.3);
  const [isNext, setIsNext] = useState(false); // Indicates the carousel direction (previous/next)
  const [isHovered, setIsHovered] = useState();

  const previous = () => {
    setIsNext(false);
    setTransition((prev) => prev + (100 / (slidesNumber - 1)));
  };

  const next = () => {
    setIsNext(true);
    setTransition((prev) => prev - (100 / (slidesNumber - 1)));
  };

  /* At the end of each transition:
  - The transition duration is set to 0. It allows us to silently reset transform: translateX to 0.
  - The slides order is changed so that there is always a "previous slide" and a "next slide" to go to without jumping too far.
  - Thanks to useEffect, the transition duration is put back to 0.3s to have a smooth animation.
  */
  const handleTransitionEnd = () => {
    setTransitionDuration(0);
    setTransition(-100 / (slidesNumber - 1));

    if (isNext) {
      setSlidesGroups((prev) => {
        const slides = [...prev];
        slides.pop();
        const prevSlide = slides.shift();
        slides.push(prevSlide);
        slides.push(slides[0]);
        return slides;
      });
    } else {
      setSlidesGroups((prev) => {
        const slides = [...prev];
        slides.shift();
        const lastSlide = slides.pop();
        slides.unshift(lastSlide);
        slides.unshift(slides[slides.length - 1]);
        return slides;
      });
    }
  };

  useEffect(() => {
    if (transitionDuration === 0) {
      setTransitionDuration(0.3);
    }
  }, [transitionDuration]);

  // Organize slides.
  // 1 "slide" = 1 group of slidesNumber mini preview pictures.
  useEffect(() => {
    const slidesGroups = [];
    designs.forEach((slide, index) => {
      index % slidesNumber === 0
        ? slidesGroups.push([slide])
        : slidesGroups[slidesGroups.length - 1].push(slide);
    });

    // If there aren't enough preview images to fill the last slide, empty space is added to compensate.
    while (slidesGroups[slidesGroups.length - 1].length < slidesNumber) {
      slidesGroups[slidesGroups.length - 1].push(null);
    }
    setSlidesGroups([slidesGroups[slidesGroups.length - 1], ...slidesGroups]);
    console.log(slidesGroups);
  }, []);

  return (
    <Container>
      <Button onClick={previous} disabled={slidesGroups.length < 3}>
        <AngleLeft />
      </Button>

      <Gallery ref={galleryRef}>
        <Slides
          onTransitionEnd={handleTransitionEnd}
          transition={transition}
          transitionDuration={transitionDuration}
          slidesNumber={slidesNumber}
        >
          {galleryRef.current && (
            <>
              {slidesGroups.map((slide, index) => {
                return (
                  <Slide key={index} size={galleryRef.current.clientWidth}>
                    
                    {slide &&
                      slide.map((slide, index) => {
                        if (slide) {
                          return (
                            <Preview
                              key={slide.id}
                              onMouseEnter={() => setIsHovered(slide.id)}
                              onMouseLeave={() => setIsHovered('')}
                            >
                              <Link to={`/shop/design/${slide.id}`}>
                              <Image
                                src={slide.image}
                                alt='Featured room design'
                                isHovered={isHovered === slide.id}
                                onTransitionEnd={(e) => e.stopPropagation()}
                              />
                              {isHovered === slide.id && <ShopButton>Shop now <Arrow /></ShopButton>}
                              </Link>
                            </Preview>
                          );
                        } else {
                          return (
                            <Preview
                              key={`empty-${index}`}
                            />
                          );
                        }
                      })}
                  </Slide>
                );
              })}
            </>
          )}
        </Slides>
      </Gallery>

      <Button onClick={next} disabled={slidesGroups.length < 3}>
        <AngleRight />
      </Button>
    </Container>
  );
}

export default Designs;
