import React, { useState } from "react";
import styled from "styled-components";
import Nav from "../../components/Nav";

// Social Icons
import { ReactComponent as Facebook } from "../../assets/icons/icon-facebook.svg";
import { ReactComponent as Instagram } from "../../assets/icons/icon-instagram.svg";
import { ReactComponent as Pinterest } from "../../assets/icons/icon-pinterest.svg";
import { ReactComponent as Twitter } from "../../assets/icons/icon-twitter.svg";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccess("Your message has been sent.");
  };

  return (
    <>
      <Nav />
      <Container>
        <Image>
          <Heading>We'd love to hear from you</Heading>
        </Image>
        <Center>
          <Heading2>Contact Us</Heading2>
          <Form onSubmit={handleFormSubmit}>
            <Field>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                type="text"
                value={firstName}
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                type="text"
                value={lastName}
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </Field>

            <MessageField>
              <Label htmlFor="message">Message</Label>
              <TextArea
                value={message}
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                rows={1}
                required
              />
            </MessageField>

            <Field>
              <SubmitBtn>Send message ⟶</SubmitBtn>
              {success && <Success>{success}</Success>}
            </Field>
          </Form>

          <Information>
            <Field>
              <InformationType>Email</InformationType>
              <div>enquiries@room.com</div>
            </Field>

            <Field>
              <InformationType>Phone</InformationType>
              <div>+1 23 456 789</div>
            </Field>
          </Information>

          <Social>
            <InformationType>Follow us</InformationType>
            <Icon href="#">
              <Facebook />
            </Icon>

            <Icon href="#">
              <Instagram />
            </Icon>

            <Icon href="#">
              <Pinterest />
            </Icon>

            <Icon href="#">
              <Twitter />
            </Icon>
          </Social>
        </Center>
      </Container>
    </>
  );
}

export default Contact;

// Styled Components
const colors = {
  white: "hsl(0, 100%, 100%)",
  black: "hsl(0, 0%, 0%)",
  background: "hsl(10, 5%, 90%)",
  darkGrey: "hsl(0, 0%, 20%)",
  grey: "hsl(0, 0%, 50%)",
  border: "hsl(0, 0%, 70%)",
};

const grid = `  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;

  @media all and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const input = `
  border: none;
  border-bottom: 1px solid ${colors.border};
  padding: .5rem 0 .25rem 0;
  font-family: 'Source Sans Pro', sans-serif;

  &::placeholder {
    color: ${colors.border};
  }

  &:focus {
    border-bottom: 1px solid ${colors.black};
  }`;

const label = `
  text-transform: uppercase;
  font-size: .825rem;
  letter-spacing: 1px;
`;

// Left - Image
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  display: flex;

  @media all and (max-width: 830px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  background: url("https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/contact%2Froom.png?alt=media&token=758d37b5-6d9d-427b-a387-f81f6380fdd4");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media all and (max-width: 830px) {
    width: 100%;
    background-position: 0 60%;
    align-items: center;
    padding: 5rem 0;
  }
`;

const Heading = styled.h2`
  font-size: 3.5rem;
  line-height: 4rem;
  color: ${colors.white};
  font-family: "Playfair Display", sans-serif;
  max-width: 35rem;
  margin-top: 10rem;
  padding: 0 5rem;

  @media all and (max-width: 830px) {
    margin-top: 0rem;
  }
`;

// Right - Contact
// Contact Form
const Heading2 = styled.h3`
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: "Playfair Display", sans-serif;
  margin: 5rem 0;

  @media all and (max-width: 830px) {
    margin: 3rem 0;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  flex: 1;
`;

const Form = styled.form`
  ${grid}
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageField = styled(Field)`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  ${label}
`;

const Input = styled.input`
  ${input}
`;

const TextArea = styled.textarea`
  ${input}
`;

const SubmitBtn = styled.button`
  align-self: flex-start;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    letter-spacing: 0.5px;
  }
`;

// Room Informations
const Social = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;

  & > div:first-child:after {
    content: "";
    display: inline-block;
    height: 1px;
    width: 5rem;
    vertical-align: middle;
    margin: 0 1rem;
    background-color: ${colors.grey};
  }
`;

const Information = styled.div`
  ${grid}
  margin-top: 5rem;
`;

const InformationType = styled.div`
  ${label};
  color: ${colors.grey};
  margin-bottom: 0.25rem;
`;

const Icon = styled.a`
  display: inline-block;
  color: ${colors.grey};
  cursor: pointer;
  margin: 0 0.25rem;

  &:hover {
    color: ${colors.black};
  }
`;

const Success = styled.div`
  color: ${colors.grey};
  margin: 1rem 0;
`;