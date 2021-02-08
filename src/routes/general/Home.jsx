import styled from "styled-components";
import Carousel from "../../components/Carousel";
import Nav from "../../components/Nav";

const colors = {
  black: "hsl(0, 0%, 0%)",
  grey: "hsl(0, 0%, 63%)",
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex: 1;

  @media all and (max-width: 576px) {
    flex-direction: column;
  }
`;

const About = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.35rem;
  line-height: 1.5rem;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  max-width: 70%;
  padding: 2rem;
`;

const Text = styled.p`
  line-height: 1.25rem;
  color: ${colors.grey};
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: fill;
  height: 100%;
  width: 100%;

  @media all and (min-width: 1200px) {
    width: initial;
  }
`;

const CarouselImages = [
  "https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/home%2Fdesktop-image-hero-1.jpg?alt=media&token=e0ad37e3-8115-49f2-a906-d1b4c4ae18ab",
  "https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/home%2Fdesktop-image-hero-2.jpg?alt=media&token=35ec1676-80b4-4eda-925e-c84ff8ce8fbf",
  "https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/home%2Fdesktop-image-hero-3.jpg?alt=media&token=27442b32-5b9b-4ed7-aa18-9148362e20df",
];

const CarouselText = [
  {
    title: "Discover innovative ways to decorate",
    description:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
  },
  {
    title: "We are available all across the globe",
    description:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
  },
  {
    title: "Manufactured with the best materials",
    description:
      "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
  },
];

function Home() {
  return (
    <Container>
      <Nav />
      <Carousel images={CarouselImages} text={CarouselText} />

      <Row>
        <ImageContainer>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/home%2Fimage-about-dark.jpg?alt=media&token=7f917181-98fd-4916-a14b-ddc9971cd1a2"
            alt="Wooden table and two modern dark chairs"
          />
        </ImageContainer>
        <Center>
          <Card>
            <About>About our furniture</About>
            <Text>
              Our multifunctional collection blends design and function to suit
              your individual taste. Make each room unique, or pick a cohesive
              theme that best express your interests and what inspires you. Find
              the furniture pieces you need, from traditional to contemporary
              styles or anything in between. Product specialists are available
              to help you create your dream space.
            </Text>
          </Card>
        </Center>
        <ImageContainer>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/home%2Fimage-about-light.jpg?alt=media&token=ae74300f-f87b-483e-ad89-baa45010fe8e"
            alt="White chair"
          />
        </ImageContainer>
      </Row>
    </Container>
  );
}

export default Home;
