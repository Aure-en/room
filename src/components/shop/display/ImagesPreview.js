import React, { useState, useEffect } from 'react';
import ImageMagnifier from './ImageMagnifier';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useCarousel } from '../../../hooks/useCarousel';

// Icons
import { ReactComponent as AngleLeft } from '../../../assets/icons/icon-angle-left.svg';
import { ReactComponent as AngleRight } from '../../../assets/icons/icon-angle-right.svg';

const colors = {
  border: 'hsl(0, 0%, 80%)',
  button: 'hsl(0, 0%, 50%)',
  disabled: 'hsl(0, 0%, 90%)',
};

const size = '35rem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${size};
  height: ${size};
  border: 1px solid ${colors.border};
`;

const Carousel = styled.div`
  width: ${size};
  height: calc((${size} - 7rem) / 4);
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 2rem;
  padding: 0;
  cursor: pointer;
  color: ${colors.button};

  &:disabled {
    color: ${colors.disabled};
  }
`;

const Gallery = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;

  & > * {
    margin-left: 1rem;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;

const Slides = styled.ul`
  display: grid;
  grid-auto-flow: column;
  transition: transform ${(props) => props.transitionDuration}s linear;
  transform: translateX(${(props) => props.transition}%);
  width: ${(props) => props.slidesGroups * 100}%;
`;

const Slide = styled.li`
  display: grid;
  grid-template-columns: repeat(${props => props.slidesNumber}, 1fr);
  justify-items: center;
`;

const Preview = styled.div`
  height: calc((${size} - 7rem) / 4);
  width: calc((${size} - 7rem) / 4);
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border: 1px solid ${colors.border};
`;

function ImagesPreview({ images }) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isImageChanging, setIsImageChanging] = useState(false);
  const {
    slidesNumber,
    transition,
    transitionDuration,
    slidesGroups,
    previous,
    next,
    handleTransitionEnd,
  } = useCarousel(images, 4);
  useCarousel(images, 4);

  useEffect(() => {
    if (isImageChanging) {
      setTimeout(() => setIsImageChanging(false), 350)
    }
  }, [isImageChanging]);

  return (
    <div>
      <Container>
        <CSSTransition
          in={isImageChanging}
          timeout={350}
          classNames='image-preview'
        >
          <ImageMagnifier image={currentImage} />
        </CSSTransition>
      </Container>

      <Carousel>
        <Button onClick={previous} disabled={slidesGroups.length < 3}>
          <AngleLeft />
        </Button>
        <Gallery>
          <Slides
            onTransitionEnd={handleTransitionEnd}
            transition={transition}
            transitionDuration={transitionDuration}
            slidesGroups={slidesGroups.length}
          >
            {slidesGroups.map((slide, index) => {
              return (
                <Slide key={index} slidesNumber={slidesNumber}>
                  {slidesGroups &&
                    slide.map((image, index) => {
                      if (image) {
                        return (
                          <Preview key={image}>
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
                        return <Preview key={`empty-${index}`}/>;
                      }
                    })}
                </Slide>
              );
            })}
          </Slides>
        </Gallery>
        <Button onClick={next} disabled={slidesGroups.length < 3}>
          <AngleRight />
        </Button>
      </Carousel>
    </div>
  );
}

export default ImagesPreview;
