import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatNavLink } from '../../../utils/utils';

// Icons
import check from '../../../assets/icons/icon-check.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Dark Grey
  tertiary: 'hsl(0, 0%, 70%)', // Bright Grey
  text: 'hsl(0, 0%, 85%)',
  label: 'hsl(0, 0%, 100%)'
};

const filterColors = {
  beige: 'hsl(20, 49%, 73%)',
  black: 'hsl(0, 0%, 0%)',
  blue: 'hsl(213, 95%, 36%)',
  brown: 'hsl(20, 35%, 29%)',
  green: 'hsl(141, 28%, 29%)',
  grey: 'hsl(0, 0%, 50%)',
  orange: 'hsl(9, 39%, 51%)',
  red: 'hsl(0, 50%, 38%)',
  white: 'hsl(0, 0%, 100%)',
  yellow: 'hsl(39, 39%, 53%)'
}

const Container = styled.div`
  line-height: 1.5rem;
  margin-right: 5rem;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1.5rem;
  }
`;

const Filter = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
  margin: 0.5rem 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const filterButton = `
  text-transform: capitalize;
  display: flex;
  align-items: center;
  margin: .15rem 0;

  &:before {
    content: '';
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.75rem;
    border: 1px solid ${colors.primary};
  }
`;

const Color = styled.button`
  ${filterButton}
  font-weight: ${(props) => props.isSelected && '600'};

  &:before {
    background-color: ${(props) => filterColors[props.color] || props.color};
  }
`;

const Checkbox = styled.button`
  ${filterButton}
  font-weight: ${(props) => props.isSelected && '600'};

  &:before {
    background-color: ${(props) => props.isSelected && colors.secondary};
    background-image: ${(props) => props.isSelected && `url(${check})`};
    background-position: ${(props) => props.isSelected && 'center'};
    border-radius: 2px;
  }
`;

const Small = styled.span`
  display: inline-block;
  margin-left: 0.4rem;
  font-size: 0.825rem;
  color: ${colors.secondary};
  font-weight: 500;
`;

const Range = styled.input.attrs((props) => ({
  type: 'range',
}))`
  margin: 0.5rem 0;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &::-webkit-slider-thumb {
    width: 13px;
    height: 13px;
    margin-top: -3px;
    border-radius: 50%;
    background: ${colors.secondary};
  }

  &::-webkit-slider-runnable-track {
    background: ${colors.tertiary};
    height: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const RangeBubble = styled.span`
  position: relative;
  display: inline-block;
  padding: 0.15rem 0;
  min-width: 3rem;
  text-align: center;
  background: ${colors.secondary};
  border-radius: 3px;
  color: ${colors.text};
  margin-left: 1rem;

  &:before {
    content: '';
    position: absolute;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid ${colors.secondary};
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Button = styled.button`
  margin-top: 1.5rem;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${colors.label};
  }
`;

function Filters({ items, handleFilters }) {
  // Filters
  const [colors, setColors] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: { min: 0, max: 0 },
    height: { min: 0, max: 0 },
    depth: { min: 0, max: 0 },
  });
  const [price, setPrice] = useState({});
  const [materials, setMaterials] = useState([]);
  const [seats, setSeats] = useState([]);

  // Filters values
  const [currentColors, setCurrentColors] = useState([]);
  const [currentDimensions, setCurrentDimensions] = useState({
    width: Infinity,
    height: Infinity,
    depth: Infinity,
  });
  const [currentPrice, setCurrentPrice] = useState(Infinity);
  const [currentMaterials, setCurrentMaterials] = useState([]);
  const [currentSeats, setCurrentSeats] = useState([]);

  // Load filter values
  useEffect(() => {
    // Set colors filters
    const colorsList = new Set();
    for (const item of items) {
      for (const color of item.colors) {
        if (!colorsList.has(color.type)) colorsList.add(color.type);
      }
    }
    setColors(Array.from(colorsList));

    // Set dimensions filters
    const dimensions = {
      width: {
        min: Infinity,
        max: 0,
      },
      height: {
        min: Infinity,
        max: 0,
      },
      depth: {
        min: Infinity,
        max: 0,
      },
    };
    for (const item of items) {
      if (item.queries.dimensions.width.min < dimensions.width.min) {
        dimensions.width.min = item.queries.dimensions.width.min;
      }
      if (item.queries.dimensions.width.max > dimensions.width.max) {
        dimensions.width.max = item.queries.dimensions.width.max;
      }
      if (item.queries.dimensions.height.min < dimensions.height.min) {
        dimensions.height.min = item.queries.dimensions.height.min;
      }
      if (item.queries.dimensions.height.max > dimensions.height.max) {
        dimensions.height.max = item.queries.dimensions.height.max;
      }
      if (item.queries.dimensions.depth.min < dimensions.depth.min) {
        dimensions.depth.min = item.queries.dimensions.depth.min;
      }
      if (item.queries.dimensions.depth.max > dimensions.depth.max) {
        dimensions.depth.max = item.queries.dimensions.depth.max;
      }
    }
    setDimensions(dimensions);
    setCurrentDimensions({
      width: dimensions.width.max,
      height: dimensions.height.max,
      depth: dimensions.depth.max,
    });

    // Set materials filters
    const materialsList = new Set();
    for (const item of items) {
      for (const material of item.queries.materials) {
        if (!materialsList.has(material)) materialsList.add(material);
      }
    }
    setMaterials(Array.from(materialsList));

    // Set price filters
    const price = {
      min: Infinity,
      max: 0,
    };

    for (const item of items) {
      if (item.queries.price.min < price.min)
        price.min = item.queries.price.min;
      if (item.queries.price.max > price.max)
        price.max = item.queries.price.max;
    }
    setPrice(price);
    setCurrentPrice(price.max);

    // Set seats filters
    const seatsList = new Set();
    for (const item of items) {
      if (item.queries.seats) {
        for (const seat of item.queries.seats) {
          if (!seatsList.has(seat)) seatsList.add(seat);
        }
      }
    }
    setSeats(Array.from(seatsList));
  }, [items]);

  // Give filters values to parent (Category)
  useEffect(() => {
    handleFilters('colors', currentColors);
  }, [currentColors]);

  useEffect(() => {
    handleFilters('dimensions', currentDimensions);
  }, [currentDimensions]);

  useEffect(() => {
    handleFilters('price', currentPrice);
  }, [currentPrice]);

  useEffect(() => {
    handleFilters('materials', currentMaterials);
  }, [currentMaterials]);

  useEffect(() => {
    handleFilters('seats', currentSeats);
  }, [currentSeats])

  // Reset filters
  const reset = () => {
    setCurrentColors([]);
    setCurrentDimensions({
      width: +dimensions.width.max,
      height: +dimensions.height.max,
      depth: +dimensions.depth.max,
    });
    setCurrentPrice(+price.max);
    setCurrentMaterials([]);
    setCurrentSeats([]);
  };

  return (
    <Container>
      <div>
        <Filter>Colors</Filter>
        {colors.sort((a, b) => a.localeCompare(b)).map((color) => {
          return (
            <Color
              key={color}
              color={color}
              isSelected={currentColors.includes(color)}
              onClick={() =>
                setCurrentColors((prevColors) => {
                  return prevColors.includes(color)
                    ? [...prevColors].filter((prevColor) => prevColor !== color)
                    : [...prevColors, color];
                })
              }
            >
              {color}
            </Color>
          );
        })}
      </div>

      <div>
        <Filter>Dimensions</Filter>
        <Column>
          <div>
            Height
            <Small>
              ({dimensions.height.min} - {dimensions.height.max})
            </Small>
          </div>
          <Row>
            <Range
              min={dimensions.height.min}
              max={dimensions.height.max}
              value={currentDimensions.height}
              onChange={(e) =>
                setCurrentDimensions({
                  ...currentDimensions,
                  height: +e.target.value,
                })
              }
            />
            <RangeBubble>{currentDimensions.height}</RangeBubble>
          </Row>

          <div>
            Width
            <Small>
              ({dimensions.width.min} - {dimensions.width.max})
            </Small>
          </div>
          <Row>
            <Range
              min={dimensions.width.min}
              max={dimensions.width.max}
              value={currentDimensions.width}
              onChange={(e) =>
                setCurrentDimensions({
                  ...currentDimensions,
                  width: +e.target.value,
                })
              }
            />
            <RangeBubble>{currentDimensions.width}</RangeBubble>
          </Row>

          <div>
            Depth
            <Small>
              ({dimensions.depth.min} - {dimensions.depth.max})
            </Small>
          </div>
          <Row>
            <Range
              min={dimensions.depth.min}
              max={dimensions.depth.max}
              value={currentDimensions.depth}
              onChange={(e) =>
                setCurrentDimensions({
                  ...currentDimensions,
                  depth: +e.target.value,
                })
              }
            />
            <RangeBubble>{currentDimensions.depth}</RangeBubble>
          </Row>
        </Column>
      </div>

      <div>
        <Filter>Materials</Filter>
        <div>
          {materials.sort((a, b) => a.localeCompare(b)).map((material) => {
            return (
              <Checkbox
                key={material}
                isSelected={currentMaterials.includes(material)}
                onClick={() =>
                  setCurrentMaterials((prevMaterials) => {
                    return prevMaterials.includes(material)
                      ? [...prevMaterials].filter(
                          (prevMaterial) => prevMaterial !== material
                        )
                      : [...prevMaterials, material];
                  })
                }
              >
                {formatNavLink(material)}
              </Checkbox>
            );
          })}
        </div>
      </div>

      <div>
        <Filter>Seats</Filter>
        <div>
          {seats.sort((a, b) => a - b).map((number) => {
            return (
              <Checkbox
                key={number}
                isSelected={currentSeats.includes(number)}
                onClick={() =>
                  setCurrentSeats((prevSeats) => {
                    return prevSeats.includes(number)
                      ? [...prevSeats].filter(
                          (prevMaterial) => prevMaterial !== number
                        )
                      : [...prevSeats, number];
                  })
                }
              >
                {number}
              </Checkbox>
            );
          })}
        </div>
      </div>

      <div>
        <Filter>
          Price
          <Small>
            ({price.min} - {price.max})
          </Small>
        </Filter>
        <Row>
          <Range
            min={price.min}
            max={price.max}
            step={0.5}
            value={currentPrice}
            onChange={(e) => setCurrentPrice(+e.target.value)}
          />
          <RangeBubble>{currentPrice}</RangeBubble>
        </Row>
      </div>

      <Button type='button' onClick={reset}>
        Reset
      </Button>
    </Container>
  );
}

export default Filters;
