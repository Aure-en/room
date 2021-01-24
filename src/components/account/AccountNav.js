import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 27%)', // Grey
};

const Nav = styled.nav`
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: capitalize;

  & > * {
    margin: .5rem 0;
  }
`;

const NavLink = styled(Link)`
  color: ${colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.primary};
    transform: translateX(${(props) => (props.selected ? '0' : '3')}%);
  }
  
`;

const CurrentLink = styled.span`
  position: relative;
  color: ${colors.primary};
  font-weight: 600;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    width: 2px;
    left: -1rem;
    position: absolute;
    background: ${colors.secondary};
    transition: height 0.3s ease 0s, top 0.3s ease 0s;
    height: ${(props) => (props.isSelected ? '110%' : '0')};
    top: ${(props) => (props.isSelected ? '-5%' : '50%')};
  }
`;

function AccountNav({ currentLink }) {
  const [links, setLinks] = useState([
    'user',
    'orders',
    'addresses',
    'payment',
  ]);

  return (
    <div>
    <Nav>
      {links.map((link) => {
        return currentLink === link ? (
          <CurrentLink key={link} isSelected={currentLink === link}>{link}</CurrentLink>
        ) : (
          <NavLink to={`/account/${link}`} key={link}>{link}</NavLink>
        );
      })}
    </Nav>
    </div>
  );
}

export default AccountNav;
