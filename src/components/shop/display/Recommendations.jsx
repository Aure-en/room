import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useFavorite } from "../../../contexts/FavoriteContext";
import useCarousel from "../../../hooks/useCarousel";
import ShopItemPreview from "./ShopItemPreview";

// Icons
import { ReactComponent as AngleLeft } from "../../../assets/icons/icon-angle-left.svg";
import { ReactComponent as AngleRight } from "../../../assets/icons/icon-angle-right.svg";

function Recommendations({ recommendations, number }) {
  const { favorites } = useFavorite();
  const {
    slidesNumber,
    transition,
    transitionDuration,
    slidesGroups,
    previous,
    next,
    handleTransitionEnd,
  } = useCarousel(recommendations, number);
  useCarousel(recommendations, number);

  return (
    <>
      <Heading>Similar Items</Heading>
      <Container>
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
                  {slide.map((slide, index) => {
                    if (slide) {
                      return (
                        <Preview key={`${slide.id}-${index}`}>
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
                    }
                    return <Preview key={`empty-${index}`} />;
                  })}
                </Slide>
              );
            })}
          </Slides>
        </Gallery>

        <Button onClick={next} disabled={slidesGroups.length < 3}>
          <AngleRight />
        </Button>
      </Container>
    </>
  );
}

export default Recommendations;

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      additional: PropTypes.objectOf(PropTypes.string),
      categories: PropTypes.arrayOf(PropTypes.string),
      colors: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          image: PropTypes.string,
          type: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      description: PropTypes.arrayOf(PropTypes.string),
      dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        depth: PropTypes.number,
      }),
      id: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.string,
      new: PropTypes.bool,
      price: PropTypes.number,
      type: PropTypes.string,
    })
  ).isRequired,
  number: PropTypes.number.isRequired,
};

// Styled components
const colors = {
  heading: "hsl(0, 0%, 27%)",
  border: "hsl(0, 0%, 80%)",
  button: "hsl(0, 0%, 50%)",
  disabled: "hsl(0, 0%, 90%)",
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
`;

const Slides = styled.div`
  display: grid;
  grid-auto-flow: column;
  transition: transform ${(props) => props.transitionDuration}s linear;
  transform: translateX(${(props) => props.transition}%);
  width: ${(props) => props.slidesGroups * 100}%;
`;

const Slide = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.slidesNumber}, 1fr);
  min-width: 0;
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
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const Heading = styled.h2`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  font-size: 1.25rem;
  margin-top: 3rem;

  &:before,
  &:after {
    content: "";
    display: inline-block;
    margin: 0 1rem;
    height: 1px;
    width: 20%;
    background: ${colors.heading};
    background: linear-gradient(270deg, transparent, ${colors.heading});
  }

  &:before {
    background: linear-gradient(270deg, ${colors.heading}, transparent);
  }
`;
