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

const Text = styled.p`
  line-height: 1.25rem;
  color: ${colors.grey};
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
