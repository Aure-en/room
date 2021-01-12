import React, { useState } from 'react'
import styled from 'styled-components';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import SignIn from '../../../components/shop/account/SignIn';
import SignUp from '../../../components/shop/account/SignUp';

// Styled components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Darker grey - for payment background
  payment: 'hsl(0, 0%, 95%)', // White - for payment text
  button: 'hsl(0, 0%, 100%)',
  border: 'hsl(0, 0%, 90%)',
  hover: 'hsl(0, 0%, 0%)' // Black - Continue Shopping Hover
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
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

  @media all and (max-width: 600px) {
    border: none;
    height: 100%;
    max-width: none;
  }
`;

const CardInner = styled.div`
  position: relative;
  transition: transform .8s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : ''};
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

function Entry() {

  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <Wrapper>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <Main>
          <Card>
            <CardInner isFlipped={isFlipped}>
              <CardSide>
                <SignIn flip={flip} />
              </CardSide>
              <CardBackSide>
                <SignUp flip={flip} />
              </CardBackSide>
            </CardInner>
          </Card>
        </Main>
      </Container>
    </Wrapper>
  )
}

export default Entry
