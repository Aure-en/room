import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import styled from 'styled-components';
import FullCarousel from '../../components/FullCarousel';
import Designs from '../../components/shop/display/Designs';

const colors = {
  primary: 'hsl(0, 0%, 27%)', // Grey
  secondary: 'hsl(0, 0%, 40%)',
  dark: 'hsl(0, 0%, 17%)',
  accent: 'hsl(46, 65%, 52%)', // Gold
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Presentation = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.secondary};
  max-width: 40rem;
  border: 5px solid ${colors.primary};
  outline: 2px solid ${colors.primary};
  outline-offset: 5px;
  margin: 5rem;
  padding: 3rem;
  line-height: 1.5rem;
  text-align: justify;

  & > p {
    margin-bottom: 1rem;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`;

const Decoration = styled.span`
  display: flex;
  align-items: center;
  align-self: center;
  color: ${colors.accent};
  margin: 1rem 0;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    margin: 0 1rem;
    height: 1px;
    width: 5rem;
    background: ${colors.accent};
    background: linear-gradient(270deg, transparent, ${colors.accent});
  }

  &:before {
    background: linear-gradient(270deg, ${colors.accent}, transparent);
  }
`;

const Heading = styled.h2`
  color: ${colors.dark};
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.5rem;
`;

const Featured = styled(Heading)`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  color: ${colors.secondary};

  &:before,
  &:after {
    content: '';
    display: inline-block;
    margin: 0 1rem;
    height: 1px;
    width: 20%;
    background: ${colors.secondary};
    background: linear-gradient(270deg, transparent, ${colors.secondary});
  }

  &:before {
    background: linear-gradient(270deg, ${colors.secondary}, transparent);
  }
`;

function Main() {
  const [designs, setDesigns] = useState([]);
  const { getDesigns } = useFirestore();

  useEffect(() => {
    (async () => {
      const designs = await getDesigns();
      setDesigns(designs);
    })();
  }, []);

  return (
    <Container>
      <FullCarousel />
      <Presentation>
        <Heading>Room</Heading>
        <Decoration>⬧</Decoration>
        <p>
          The furniture is the foundation of a home. That's why Room is
          passionate about offering a huge variety of furniture at all prices.
          Whatever your style, whatever your needs, find furniture that's made
          for you.
        </p>

        <p>
          Each year, the collection is refreshed to stay on trend and keep up
          with your needs, whilst also taking more care of the planet and its
          inhabitants. Over half of our wooden furniture meets sustainable
          criteria. Every year we progress with our products, but also in
          raising awareness among design students and young designers to
          encourage them to think about eco-design. We believe we can reduce the
          impact on the environment without compromising on style. The second
          life of products starts here!
        </p>

        <p>So, you're free to have your own style!</p>
      </Presentation>

      {designs.length !== 0 && (
        <>
          <Featured>Featured Rooms</Featured>
          <Designs designs={designs} />
        </>
      )}
    </Container>
  );
}

export default Main;
