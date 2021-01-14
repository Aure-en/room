// Nav specifics to the Shop Page.
// Looks different from the normal nav, and displays links for shopping categories, a shopping cart, the user's saved items, a search bar...

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styled from 'styled-components';
import SideNav from './SideNav';
import AccessSettings from '../../../components/shop/account/AccessSettings';

// Icons
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';
import { ReactComponent as Cart } from '../../../assets/icons/icon-shopping-cart.svg';
import { ReactComponent as Heart } from '../../../assets/icons/icon-heart.svg';
import { ReactComponent as Home } from '../../../assets/icons/icon-home.svg';
import { ReactComponent as Search } from '../../../assets/icons/icon-search.svg';
import { ReactComponent as User } from '../../../assets/icons/icon-user.svg';

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
`;

const Brand = styled.span`
  font-size: 1.5rem;
  margin: 0 2rem;
  color: ${colors.primary};
`;

const NavIconLink = styled.span`
  ${icon}
`;

const NavIcon = styled.span`
  ${icon}
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  justify-self: right;
`;

function Nav() {
  const { currentUser } = useAuth();
  const navRef = useRef();

  return (
    <Container ref={navRef}>
      <Navigation>
        <NavLeft>
          <NavIconLink>
            <SideNav nav={navRef} />
          </NavIconLink>
          <NavIconLink>
            <Home />
          </NavIconLink>
        </NavLeft>

        <Link to='/'>
          <Brand>
            <Logo />
          </Brand>
        </Link>

        <NavRight>
          <NavIcon>
            <Search />
          </NavIcon>

          {currentUser && !currentUser.isAnonymous ? (
            <AccessSettings />
          ) : (
            <NavIcon>
              <Link to='/account/entry'><User /></Link>
            </NavIcon>
          )}

          <NavIconLink>
            <Link to='/shop/favorite'>
              <Heart />
            </Link>
          </NavIconLink>
          <NavIconLink>
            <Link to='/shop/cart'>
              <Cart />
            </Link>
          </NavIconLink>
        </NavRight>
      </Navigation>
    </Container>
  );
}

export default Nav;
