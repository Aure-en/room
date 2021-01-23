import React, { useState, useEffect } from 'react';
import ImageMagnifier from './ImageMagnifier';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

// Icons
import { ReactComponent as AngleLeft } from '../../../assets/icons/icon-angle-left.svg';
import { ReactComponent as AngleRight } from '../../../assets/icons/icon-angle-right.svg';

const colors = {
  border: 'hsl(0, 0%, 80%)',
  button: 'hsl(0, 0%, 50%)',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border: 1px solid ${colors.border};
`;

const Carousel = styled.div`
  width: ${(props) => props.size}rem;
  height: calc((${(props) => props.size}rem - 7rem) / 4);
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 2rem;
  padding: 0;
  cursor: pointer;
  color: ${colors.button};
`;

const Gallery = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Slides = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  transition: transform ${(props) => props.transitionDuration}s linear;
  transform: translateX(${(props) => props.transition}%);
`;

const Slide = styled.li`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
`;

const Preview = styled.div`
  height: calc((${(props) => props.size}rem - 7rem) / 4);
  width: calc((${(props) => props.size}rem - 7rem) / 4);
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border: 1px solid ${colors.border};
`;

function ImagesPreview({ images, size }) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [slides, setSlides] = useState([]);
  const [transition, setTransition] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0.3);
  const [isImageChanging, setIsImageChanging] = useState(false);

  // Organize slides.
  // 1 "slide" = 1 group of 4 mini preview pictures.
  useEffect(() => {
    const slides = [];
    images.forEach((image, index) => {
      index % 4 === 0
        ? slides.push([image])
        : slides[slides.length - 1].push(image);
    });

    // If there aren't enough preview images to fill the last slide, empty space is added to compensate.
    while (slides[slides.length - 1].length < 4) {
      slides[slides.length - 1].push(null);
    }
    setSlides(slides);
  }, []);

  // Functions to change slide
  const next = () => {
    setTransition((prev) => prev - 100);
  };

  const previous = () => {
    setTransition((prev) => prev + 100);
  };

  /* At the end of each slider transition:
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

  useEffect(() => {
    if (isImageChanging) {
      setTimeout(() => setIsImageChanging(false), 350)
    }
  }, [isImageChanging]);

  return (
    <div>
      <Container size={size}>
        <CSSTransition
          in={isImageChanging}
          timeout={350}
          classNames='image-preview'
        >
          <ImageMagnifier image={currentImage} />
        </CSSTransition>
      </Container>

      <Carousel size={size}>
        <Button onClick={previous} disabled={slides.length < 2}>
          <AngleLeft />
        </Button>
        <Gallery>
          <Slides
            onTransitionEnd={handleTransitionEnd}
            transition={transition}
            transitionDuration={transitionDuration}
          >
            {slides.map((slide, index) => {
              return (
                <Slide size={size} key={index}>
                  {slides &&
                    slide.map((image, index) => {
                      if (image) {
                        return (
                          <Preview size={size} key={image}>
                            <Image
                              src={image}
                              alt='Item Preview'
                              onClick={() => {
                                if (currentImage === image) return;
                                setIsImageChanging(true);
                                setCurrentImage(image);
                              }}
                            />
                          </Preview>
                        );
                      } else {
                        return <Preview size={size} key={`empty-${index}`}/>;
                      }
                    })}
                </Slide>
              );
            })}
          </Slides>
        </Gallery>
        <Button onClick={next} disabled={slides.length < 2}>
          <AngleRight />
        </Button>
      </Carousel>
    </div>
  );
}

export default ImagesPreview;
