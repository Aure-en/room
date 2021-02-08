// Nav specifics to the Shop Page.
// Looks different from the normal nav, and displays links for shopping categories, a shopping cart, the user's saved items, a search bar...

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useFavorite } from "../../../contexts/FavoriteContext";
import useCart from "../../../hooks/useCart";
import SideNav from "./SideNav";
import AccessSettings from "../../account/AccessSettings";

// Icons
import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import { ReactComponent as Cart } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as Heart } from "../../../assets/icons/icon-heart.svg";
import { ReactComponent as HeartFilled } from "../../../assets/icons/icon-heart-filled.svg";
import { ReactComponent as Home } from "../../../assets/icons/icon-home.svg";
import { ReactComponent as Search } from "../../../assets/icons/icon-search.svg";
import { ReactComponent as User } from "../../../assets/icons/icon-user.svg";

const colors = {
  primary: "hsl(0, 0%, 0%)", // Black
  secondary: "hsl(0, 0%, 27%)", // Grey
  stamp: "hsl(0, 0%, 100%)",
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
  z-index: 10;
  display: grid;
  align-items: baseline;
  font-family: "Spartan", sans-serif;
  width: 100vw;
  max-width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.secondary};

  @media all and (min-width: 576px) {
    padding: 1rem;
  }
`;

const Navigation = styled.nav`
  color: ${colors.primary};
  z-index: 20;
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

const Position = styled.span`
  position: relative;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  justify-self: right;
  display: grid;
  grid-template: repeat(2, auto) / repeat(2, auto);
  align-items: center;
  justify-items: center;

  @media all and (min-width: 440px) {
    display: block;
  }
`;

const Stamp = styled.span`
  position: absolute;
  display: inline-block;
  top: -1rem;
  right: -0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  background: ${colors.stamp};
  border-radius: 50%;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3px;
`;

function Nav() {
  const { currentUser } = useAuth();
  const { getCart, cartListener } = useCart();
  const { favorites } = useFavorite();
  const navRef = useRef();
  const [cart, setCart] = useState(0);

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const cart = await getCart(currentUser.uid);
      setCart(cart.length);
    })();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = cartListener(currentUser.uid, async () => {
      const cart = await getCart(currentUser.uid);
      setCart(cart.length);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <Container ref={navRef}>
      <Navigation>
        <NavLeft>
          <NavIconLink>
            <SideNav nav={navRef} />
          </NavIconLink>
          <NavIconLink>
            <Link to="/">
              <Home />
            </Link>
          </NavIconLink>
        </NavLeft>

        <Link to="/shop">
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
              <Link to="/shop/entry">
                <User />
              </Link>
            </NavIcon>
          )}

          <NavIconLink>
            <Position>
              <Link to="/shop/favorite">
                {favorites.length !== 0 ? (
                  <>
                    <HeartFilled />
                    <Stamp>{favorites.length}</Stamp>
                  </>
                ) : (
                  <Heart />
                )}
              </Link>
            </Position>
          </NavIconLink>
          <NavIconLink>
            <Position>
              <Link to="/shop/cart">
                <Cart />
                {cart !== 0 && <Stamp>{cart}</Stamp>}
              </Link>
            </Position>
          </NavIconLink>
        </NavRight>
      </Navigation>
    </Container>
  );
}

export default Nav;
