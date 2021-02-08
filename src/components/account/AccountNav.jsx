import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const colors = {
  primary: "hsl(0, 0%, 0%)", // Black
  secondary: "hsl(0, 0%, 37%)", // Grey
};

const Nav = styled.nav`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  font-family: "Source Sans Pro", sans-serif;
  text-transform: capitalize;
  max-width: 80vw;
  width: 100vw;

  & > * {
    margin: 0.5rem 0;
  }

  @media all and (min-width: 930px) {
    flex-direction: column;
    margin-bottom: 0;
    margin-right: 5rem;
    width: initial;
  }
`;

const NavLink = styled(Link)`
  color: ${colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.primary};
    text-decoration: underline;
  }

  @media all and (min-width: 930px) {
    transform: translateX(${(props) => (props.selected ? "0" : "3")}%);
  }
`;

const CurrentLink = styled.span`
  position: relative;
  color: ${colors.primary};
  font-weight: 600;

  &:after {
    background: none repeat scroll 0 0 transparent;
    left: 0;
    content: "";
    display: block;
    height: 2px;
    bottom: -0.5rem;
    position: absolute;
    background: ${colors.secondary};
    transition: all 0.3s ease 0s, top 0.3s ease 0s;
    width: ${(props) => (props.isSelected ? "110%" : "0")};
    left: ${(props) => (props.isSelected ? "-2.5%" : "50%")};
  }

  @media all and (min-width: 930px) {
    &:after {
      bottom: 0;
      width: 2px;
      left: -1rem;
      height: ${(props) => (props.isSelected ? "110%" : "0")};
      top: ${(props) => (props.isSelected ? "5%" : "50%")};
    }
  }
`;

function AccountNav({ currentLink }) {
  const [links, setLinks] = useState([
    "user",
    "orders",
    "addresses",
    "payment",
  ]);

  return (
    <Nav>
      {links.map((link) => {
        return currentLink === link ? (
          <CurrentLink key={link} isSelected={currentLink === link}>
            {link}
          </CurrentLink>
        ) : (
          <NavLink to={`/account/${link}`} key={link}>
            {link}
          </NavLink>
        );
      })}
    </Nav>
  );
}

AccountNav.propTypes = {
  currentLink: PropTypes.string.isRequired,
};

export default AccountNav;
