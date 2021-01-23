import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useFavorite } from '../../../contexts/FavoriteContext';
import { useFirestore } from '../../../hooks/useFirestore';
import ShopItemPreview from '../items/ShopItemPreview';

// Icons
import { ReactComponent as AngleLeft } from '../../../assets/icons/icon-angle-left.svg';
import { ReactComponent as AngleRight } from '../../../assets/icons/icon-angle-right.svg';

// Styled components
const colors = {
  border: 'hsl(0, 0%, 80%)',
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
  overflow: hidden;
  margin: 0 1rem;
`;

const Slides = styled.div`
  display: flex;
  transition: transform ${(props) => props.transitionDuration}s linear;
  transform: translateX(${(props) => props.transition}%);
`;

const Slide = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 3rem;
  min-width: ${(props) => props.size}px;
`;

const Button = styled.button`
  width: 2rem;
  padding: 0;
  cursor: pointer;
  color: ${colors.button};
`;

const Preview = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

function Recommendations({ id }) {
  const [recommendations, setRecommendations] = useState([]);
  const [transition, setTransition] = useState(-100);
  const [slidesGroups, setSlidesGroups] = useState([]);
  const [slidesNumber, setSlidesNumber] = useState(4);
  const [transitionDuration, setTransitionDuration] = useState(0.3);
  const [isNext, setIsNext] = useState(false); // Indicates the carousel direction (previous/next)
  const galleryRef = useRef();
  const { getRecommendations } = useFirestore();
  const { favorites } = useFavorite();

  // Get Recommendations
  useEffect(() => {
    (async () => {
      const recommendations = await getRecommendations(id);
      setRecommendations(recommendations);
    })();
  }, []);

  const previous = () => {
    setIsNext(false);
    setTransition((prev) => prev + 100);
  };

  const next = () => {
    setIsNext(true);
    setTransition((prev) => prev - 100);
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

  // Organize slides.
  // 1 "slide" = 1 group of slidesNumber mini preview pictures.
  useEffect(() => {
    const slidesGroups = [];
    recommendations.forEach((slide, index) => {
      index % slidesNumber === 0
        ? slidesGroups.push([slide])
        : slidesGroups[slidesGroups.length - 1].push(slide);
    });

    // If there aren't enough preview images to fill the last slide, empty space is added to compensate.
    if (slidesGroups.length === 0) return;
    while (slidesGroups[slidesGroups.length - 1].length < slidesNumber) {
      slidesGroups[slidesGroups.length - 1].push(null);
    }
    setSlidesGroups([slidesGroups[slidesGroups.length - 1], ...slidesGroups]);
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
        >
          {galleryRef.current && (
            <>
              {slidesGroups.map((slide, index) => {
                return (
                  <Slide key={index} size={galleryRef.current.clientWidth}>
                    {slide.map((slide, index) => {
                      if (slide) {
                        return (
                          <Preview key={slide.id}>
                            <ShopItemPreview
                              name={slide.name}
                              images={slide.images}
                              price={slide.price}
                              id={slide.id}
                              isFavorite={favorites.includes(slide.id)}
                              isNew={slide.isNew}
                            />
                          </Preview>
                        );
                      } else {
                        return <Preview key={`empty-${index}`} />;
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

export default Recommendations;
