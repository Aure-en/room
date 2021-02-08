import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useCarousel from "../../../hooks/useCarousel";

// Icons
import { ReactComponent as AngleLeft } from "../../../assets/icons/icon-angle-left.svg";
import { ReactComponent as AngleRight } from "../../../assets/icons/icon-angle-right.svg";
import { ReactComponent as Arrow } from "../../../assets/icons/icon-small-arrow.svg";

// Styled components

const colors = {
  background: "hsl(0, 0%, 100%)",
  button: "hsl(0, 0%, 50%)",
  disabled: "hsl(0, 0%, 80%)",
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

  &:disabled {
    color: ${colors.disabled};
  }
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
  transition: transform 0.25s linear;
  transform: ${(props) => props.isHovered && "scale(1.1)"};
`;

const ShopButton = styled.span`
  background: ${colors.background};
  color: ${colors.text};
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

function Designs({ designs }) {
  const [isHovered, setIsHovered] = useState("");
  const galleryRef = useRef();
  const {
    slidesNumber,
    transition,
    transitionDuration,
    slidesGroups,
    previous,
    next,
    handleTransitionEnd,
  } = useCarousel(designs, 3);
  useCarousel(designs, 3);

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
              {slidesGroups.map((slide, indexGroup) => {
                return (
                  <Slide key={indexGroup} size={galleryRef.current.clientWidth}>
                    {slide &&
                      slide.map((slide, index) => {
                        if (slide) {
                          return (
                            <Preview
                              key={`${slide.id}-${indexGroup}`}
                              onMouseEnter={() => setIsHovered(slide.id)}
                              onMouseLeave={() => setIsHovered("")}
                            >
                              <Link to={`/shop/design/${slide.id}`}>
                                <Image
                                  src={slide.image}
                                  alt="Featured room design"
                                  isHovered={isHovered === slide.id}
                                  onTransitionEnd={(e) => e.stopPropagation()}
                                />
                                {isHovered === slide.id && (
                                  <ShopButton>
                                    Shop now 
{' '}
<Arrow />
                                  </ShopButton>
                                )}
                              </Link>
                            </Preview>
                          );
                        }
                        return <Preview key={`empty-${index}`} />;
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
