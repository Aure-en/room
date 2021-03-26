import React, { useState, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Icons
import { ReactComponent as User } from "../../assets/icons/icon-user.svg";

function AccessSettings() {
  const { signOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconRef = useRef();
  const menuRef = useRef();
  const location = useLocation();
  const history = useHistory();

  const handleSignOut = async () => {
    await signOut();
    history.push("/shop");
  };

  return (
    <Container>
      <Icon ref={iconRef}>
        <User onClick={() => setIsModalOpen(!isModalOpen)} />
      </Icon>

      {isModalOpen && (
        <UserModal
          ref={menuRef}
          icon={iconRef.current}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Link
            to="/account/orders"
            onClick={() => {
              if (location.pathname !== "/account/orders")
                setIsModalOpen(false);
            }}
          >
            <ModalLink>Orders</ModalLink>
          </Link>
          <Link
            to="/account/addresses"
            onClick={() => {
              if (location.pathname !== "/account/addresses")
                setIsModalOpen(false);
            }}
          >
            <ModalLink>Addresses</ModalLink>
          </Link>
          <Link
            to="/account/payment"
            onClick={() => {
              if (location.pathname !== "/account/payment")
                setIsModalOpen(false);
            }}
          >
            <ModalLink>Payment</ModalLink>
          </Link>
          <Link
            to="/account/user"
            onClick={() => {
              if (location.pathname !== "/account/user") setIsModalOpen(false);
            }}
          >
            <ModalLink>Settings</ModalLink>
          </Link>
          <ModalLink onClick={handleSignOut}>Log out</ModalLink>
        </UserModal>
      )}
    </Container>
  );
}

export default AccessSettings;

// Styled Components
const colors = {
  primary: "hsl(0, 0%, 0%)", // Black
  secondary: "hsl(0, 0%, 27%)", // Grey
  tertiary: "hsl(0, 0%, 50%)",
  background: "hsl(0, 0%, 100%)", // White
};

const Container = styled.span`
  position: relative;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const UserModal = styled(Modal)`
  position: absolute;
  top: ${(props) =>
    parseInt(props.icon.getBoundingClientRect().bottom, 10) + 10}px;
  left: ${(props) =>
    parseInt(props.icon.getBoundingClientRect().left, 10) - 40}px;
  background: ${colors.background};
  padding: 1rem 0;
  border: 1px solid black;
  border-radius: 5px;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 0.825rem;
  display: flex;
  flex-direction: column;
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
