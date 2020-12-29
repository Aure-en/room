import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo.svg';

const Container = styled.div`
  position: absolute;
  z-index: 1;
  padding: 1rem;
  display: grid;
  width: 100vw;
  max-width: 100%;
  grid-template-columns: 1fr auto 1fr;
  align-items: baseline;
`;

const Button = styled.button`
  display: none;
  padding: 1rem;
  justify-self: start;
  cursor: pointer;

  @media all and (max-width: 576px) {
    display: inline-block;
  }
`;

const Navigation = styled.nav`
  position: absolute;
  font-family: 'Spartan', sans-serif;
  color: #fff;
  z-index: 2;
  display: flex;
  align-items: center;
  left: 5rem;
  top: 2.5rem;

  @media all and (max-width: 1000px) {
    flex-direction: column;
    left: 2.5rem;
    top: 2.5rem;
  }

  @media all and (max-width: 650px) {
    left: 1rem;
    top: 1rem;
  }

  @media all and (max-width: 576px) {
    display: ${(props) => (props.isNavOpen ? 'flex' : 'none')};
    flex-direction: row;
    background: #fff;
    width: 100vw;
    top: 0;
    left: 0;
    height: 3.5rem;
  }
`;

const Brand = styled.span`
  font-size: 1.5rem;
  margin: 0 2rem;
  color: #fff;

  @media all and (max-width: 576px) {
    display: none;
  }
`;

const BrandMobile = styled(Brand)`
  display: none;

  @media all and (max-width: 576px) {
    display: inline-block;
  }
`;

const Link = styled.a`
  position: relative;
  margin: 0 1.25rem;
  color: #fff;

  @media all and (max-width: 576px) {
    color: #000;
  }

  &:hover:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    margin-left: -12.5px;
    width: 25px;
    height: 2px;
    background: #fff;

    @media all and (max-width: 576px) {
      background: #000;
    }
  }
`;

function Nav() {
  // For mobile users
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleOpenNav = () => {
    setIsNavOpen(true);
  };

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  return (
    <Container>
      <Button onClick={handleOpenNav}>
        <svg width='20' height='14' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M20 12v2H0v-2h20zm0-6v2H0V6h20zm0-6v2H0V0h20z'
            fill='#FFF'
            fill-rule='evenodd'
          />
        </svg>
      </Button>
      <BrandMobile><Logo /></BrandMobile>
      <Navigation isNavOpen={isNavOpen}>
        <Brand><Logo /></Brand>
        <Button onClick={handleCloseNav}>
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.364.222l1.414 1.414L9.414 8l6.364 6.364-1.414 1.414L8 9.414l-6.364 6.364-1.414-1.414L6.586 8 .222 1.636 1.636.222 8 6.586 14.364.222z'
              fill='#000'
              fill-rule='evenodd'
              opacity='.201'
            />
          </svg>
        </Button>
        <Link href='#'>home</Link>
        <Link href='#'>shop</Link>
        <Link href='#'>about</Link>
        <Link href='#'>contact</Link>
      </Navigation>
    </Container>
  );
}

export default Nav;
