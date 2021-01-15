import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

// Icons
import { ReactComponent as User } from '../../../assets/icons/icon-user.svg'

// Styled Components

const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 27%)', // Grey
  tertiary: 'hsl(0, 0%, 50%)',
  background: 'hsl(0, 0%, 100%)', // White
}

const Container = styled.span`
  position: relative;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.background};
  padding: 1rem 0;
  border: 1px solid black;
  border-radius: 5px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 0.825rem;
`;

const ModalLink = styled.span`
  display: inline-block;
  padding: 0.25rem 1.5rem;
  cursor: pointer;
  color: ${colors.secondary};
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${colors.primary};
    text-decoration: underline;
  }
`;

function AccessSettings() {

  const { signOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <Icon><User onClick={() => setIsModalOpen(!isModalOpen)} /></Icon>

      {isModalOpen &&
        <Modal>
            <Link to='/account/orders'><ModalLink>Orders</ModalLink></Link>
            <Link to='/account/addresses'><ModalLink>Addresses</ModalLink></Link>
            <Link to='/account/payment'><ModalLink>Payment</ModalLink></Link>
            <Link to='/account/user'><ModalLink>Settings</ModalLink></Link>
            <ModalLink onClick={signOut}>Log out</ModalLink>
        </Modal>
      }

    </Container>
  )
}

export default AccessSettings
