// Nav specifics to the Shop Page. 
// Looks different from the normal nav, and displays links for shopping categories, a shopping cart, the user's saved items, a search bar...

import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';

// Icons
import { ReactComponent as Cart } from '../../assets/icons/icon-shopping-cart.svg';
import { ReactComponent as Heart } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as Home } from '../../assets/icons/icon-home.svg';
import { ReactComponent as Search } from '../../assets/icons/icon-search.svg';
import { ReactComponent as User } from '../../assets/icons/icon-user.svg';

const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 27%)', // Grey
};

// Styled components
const icon = `
  color: ${colors.secondary};
  cursor: pointer;
  margin: 0 .5rem;

  &:hover {
    color: ${colors.primary};
  }
`;

const Container = styled.div`
  z-index: 1;
  padding: 1rem;
  display: grid;
  align-items: baseline;
  font-family: 'Spartan', sans-serif;
  width: 100vw;
  max-width: 100%;
`;

const Navigation = styled.nav`
  color: ${colors.primary};
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media all and (max-width: 600px) {
    display: none;
  }
`;

const Brand = styled.span`
  font-size: 1.5rem;
  margin: 0 2rem;
  color: ${colors.primary};
`;

const NavIconLink = styled.a`
  ${icon}
`;

const NavIcon = styled.span`
  ${icon}
`;

const NavRight = styled.div`
  justify-self: right;
`;

function Nav() {
  return (
    <Container>
      <Navigation>
        <div>
          <NavIconLink>
            <Home />
          </NavIconLink>
          <NavIconLink>
            <Home />
          </NavIconLink>
        </div>

        <Link to='/'>
          <Brand>
            <Logo />
          </Brand>
        </Link>

        <NavRight>
          <NavIcon>
            <Search />
          </NavIcon>
          <NavIconLink>
            <User />
          </NavIconLink>
          <NavIconLink>
            <Heart />
          </NavIconLink>
          <NavIconLink>
            <Cart />
          </NavIconLink>
        </NavRight>
      </Navigation>
    </Container>
  );
}

export default Nav;
