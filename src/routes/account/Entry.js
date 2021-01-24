import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SignIn from '../../components/account/SignIn';
import SignUp from '../../components/account/SignUp';

import background from '../../assets/images/entry.png';

// Styled components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Darker grey
  background: 'hsl(0, 0%, 100%)',
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background: url(${background});
  background-size: cover;
  padding: 3rem 0;
`;

const Main = styled.div`
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const Card = styled.div`
  width: 100vw;
  max-width: 500px;
  border: 1px solid ${colors.secondary};
  height: 45rem;
  perspective: 150rem;
  padding: 0 5rem;
  background: ${colors.background};

  @media all and (max-width: 600px) {
    border: none;
    height: 100%;
    max-width: none;
  }
`;

const CardInner = styled.div`
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : '')};
  height: 100%;
  width: 100%;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardBackSide = styled(CardSide)`
  transform: rotateY(180deg);
`;

function Entry({ location }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    location.state && location.state.isPaying ?
    setIsPaying(true) : setIsPaying(false)
  }, [])

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container>
      <Main>
        <Card>
          <CardInner isFlipped={isFlipped}>
            <CardSide>
              <SignUp flip={flip} isPaying={isPaying} />
            </CardSide>
            <CardBackSide>
              <SignIn flip={flip} isPaying={isPaying} />
            </CardBackSide>
          </CardInner>
        </Card>
      </Main>
    </Container>
  );
}

export default Entry;
