import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Icons
import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import { ReactComponent as Facebook } from "../../../assets/icons/icon-facebook.svg";
import { ReactComponent as Pinterest } from "../../../assets/icons/icon-pinterest.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/icon-twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/icons/icon-instagram.svg";

function Footer() {
  return (
    <Container>
      <Content>
        <Room />
        <div>
          <Category>Discover Room</Category>
          <ul>
            <Li>About us</Li>
            <Li>Contact</Li>
            <Li>Terms & Conditions</Li>
          </ul>
        </div>

        <div>
          <Category>Room's Shop</Category>
          <ul>
            <Li>
              <Link to="/account/user">My account</Link>
            </Li>
            <Li>
              <Link to="/shop/tracking">Track an order</Link>
            </Li>
            <Li>Delivery</Li>
            <Li>Returns</Li>
            <Li>Payment</Li>
          </ul>
        </div>

        <Contact>
          <strong>+1 23 456 789</strong>
          <div>enquiries@room.com</div>
          <div>
            <Icon>
              <Facebook />
            </Icon>
            <Icon>
              <Instagram />
            </Icon>
            <Icon>
              <Pinterest />
            </Icon>
            <Icon>
              <Twitter />
            </Icon>
          </div>
        </Contact>
      </Content>
    </Container>
  );
}

export default Footer;


// Styled components
const colors = {
  heading: "hsl(0, 0%, 95%)",
  primary: "hsl(0, 0%, 90%)",
  social: "hsl(0, 0%, 80%)",
  secondary: "hsl(0, 0%, 20%)", // Grey
};

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: ${colors.secondary};
  color: ${colors.primary};
  line-height: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  max-width: 1200px;

  & > * {
    margin-bottom: 2rem;
  }

  @media all and (min-width: 576px) {
    flex-direction: row;

    & > * {
      margin-bottom: 0;
    }
  }
`;

const Category = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${colors.heading};
`;

const Room = styled(Logo)`
  align-self: center;
`;

const Li = styled.li`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > *:last-child {
    margin-top: 0.5rem;
  }
`;

const Icon = styled.span`
  display: inline-block;
  margin-left: 0.75rem;
  color: ${colors.social};
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`;
