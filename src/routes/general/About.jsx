import React from "react";
import styled from "styled-components";
import Nav from "../../components/Nav";

function About() {
  return (
    <Container>
      <Nav />
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/about%2Fabout.jpg?alt=media&token=cdb4b49d-b7dd-4db1-87fb-3388ba0b0dd6"
        alt="Furnitures"
      />
      <Center>
        <Content>
          <Title>About Us</Title>

          <Heading>
            Our design philosophy is simple: interiors matter. They matter
            because they influence how we feel, how we act and how we live,
            often without us realising it.
          </Heading>

          <TextDropCap>
            These, and many more, are the backdrops to life’s most memorable
            moments and each one has a significant impact on us, some without us
            even realising. And, so, we create interiors that matter—the kind of
            interiors that are worthy of life’s memorable moments.
          </TextDropCap>

          <Text>
            Extraordinary interiors may call for bespoke furniture which is why
            we offer a custom furniture service for our discerning clients. To
            design and manufacture extra special furniture designs for our
            clients, we commission the best the industry has to offer in the
            form of proven and reliable product designers and artisans. Whether
            built-in cabinetry or a unique custom-made furniture piece, we
            guarantee that we will create the perfect piece for your project
            when the right thing just can’t be found.
          </Text>
        </Content>
      </Center>
    </Container>
  );
}

export default About;

const colors = {
  black: "hsl(0, 0%, 0%)",
  grey: "hsl(0, 0%, 63%)",
  gold: "hsl(35, 49%, 78%)",
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;

  @media all and (max-width: 576px) {
    flex-direction: column;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  max-width: 50%;

  @media all and (max-width: 1000px) {
    max-width: initial;
  }
`;

const Title = styled.div`
  text-transform: uppercase;
  text-align: center;
  color: ${colors.gold};
`;

const Content = styled.section`
  max-width: 70%;
`;

const Heading = styled.div`
  font-family: "Spartan", sans-serif;
  text-transform: lowercase;
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem 0;

  &:after {
    position: relative;
    display: inline-block;
    content: "";
    height: 1px;
    width: 3rem;
    background-color: ${colors.gold};
    margin-top: 2rem;
  }
`;

const TextDropCap = styled.p`
  margin: 2rem 0;
  font-weight: 600;
  line-height: 1.5rem;

  &:first-letter {
    float: left;
    font-size: 3rem;
    line-height: 1;
    margin-right: 0.5rem;
  }
`;

const Text = styled.p`
  line-height: 1.5rem;
  color: ${colors.grey};
`;

const Image = styled.img`
  width: 100%;
  min-width: 0;
  object-fit: cover;
`;

