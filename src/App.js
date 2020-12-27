import Carousel from './components/Carousel';
import Nav from './components/Nav';
import './styles.css';
import styled from 'styled-components';

// Images
import about_dark from './images/image-about-dark.jpg'
import about_light from './images/image-about-light.jpg'

const colors = {
  black: 'hsl(0, 0%, 0%)',
  grey: 'hsl(0, 0%, 63%)',
  darkGrey: 'hsl(0, 0%, 27%)',
}

const Row = styled.div`
  display: flex;

  @media all and (max-width: 576px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 300;
  margin-bottom: 2rem;
`;

const About = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: .35rem;
  line-height: 1.5rem; 
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  max-width: 70%;
  min-width: 450px;
  padding: 2rem;

  @media all and (max-width: 576px) {
    min-width: 0;
    padding: 1rem;
  }

`;

const ShopLink = styled.a`
  text-transform: uppercase;
  letter-spacing: .5rem;
  font-weight: 300;
  font-size: 1.25rem;
  margin-top: 2rem;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: ${colors.grey};
  }
`;

const Text = styled.p`
  line-height: 1.25rem;
  color: ${colors.grey};
`;

const Arrow = styled.svg`
  margin-left: 2rem;
`;

const Image = styled.img`
  width: 100%;
  min-width: 0;
  object-fit: cover;
`;

function App() {
  return (
    <div className='App'>
      <Row>
        <Nav />
        <Carousel />
        <Center>
          <Card>
            <Title>Discover innovative ways to decorate</Title>
            <Text>
              We provide unmatched quality, comfort, and style for property owners
              across the country. Our experts combine form and function in
              bringing your vision to life. Create a room in your own style with
              our collection and make your property a reflection of you and what
              you love.
            </Text>
            <ShopLink>Shop now<Arrow width="40" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z" fill="currentColor" fill-rule="nonzero"/></Arrow></ShopLink>
          </Card>
        </Center>
      </Row>

      <Row>
        <Image src={about_dark} alt='Wooden table and two modern dark chairs' />
        <Center>
          <Card>
            <About>About our furniture</About>
            <Text>
              Our multifunctional collection blends design and function to suit
              your individual taste. Make each room unique, or pick a cohesive
              theme that best express your interests and what inspires you. Find
              the furniture pieces you need, from traditional to contemporary
              styles or anything in between. Product specialists are available to
              help you create your dream space.
            </Text>
          </Card>
        </Center>
        <Image src={about_light} alt='White chair' />
      </Row>
    </div>
  );
}

export default App;
