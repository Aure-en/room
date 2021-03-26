import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Switch, useRouteMatch, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import Nav from "../../components/shop/nav/Nav";
import ShopNav from "../../components/shop/nav/ShopNav";
import AccountNav from "../../components/account/AccountNav";
import PrivateRoute from "../types/PrivateRoute";
import Orders from "./settings/Orders";
import Addresses from "./settings/Addresses";
import PaymentCards from "./settings/Payment";
import Settings from "./settings/Settings";

function Account({ match }) {
  const { currentUser } = useAuth();
  const { windowSize } = useWindowSize();
  const currentLinkId = useRouteMatch("/account/:id").params.id;

  return (
    <>
      {currentUser && !currentUser.isAnonymous ? (
        <div>
          <Nav />
          {windowSize.width > 500 && <ShopNav />}

          <Container>
            <Content>
              <AccountNav currentLink={currentLinkId} />
              <Switch>
                <Tab>
                  <PrivateRoute
                    exact
                    path={`${match.path}/orders`}
                    component={Orders}
                  />
                  <PrivateRoute
                    exact
                    path={`${match.path}/addresses`}
                    component={Addresses}
                  />
                  <PrivateRoute
                    exact
                    path={`${match.path}/payment`}
                    component={PaymentCards}
                  />
                  <PrivateRoute
                    exact
                    path={`${match.path}/user`}
                    component={Settings}
                  />
                </Tab>
              </Switch>
            </Content>
          </Container>
        </div>
      ) : (
        <Redirect to="/shop/entry" />
      )}
    </>
  );
}

Account.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default Account;

const Container = styled.div`
  display: grid;
  grid-template-columns = auto 1fr;
  justify-content: center;
  align-content: center;
  margin: 5rem 0;

  @media all and (min-width: 576px) {
    margin: 5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (min-width: 930px) {
    flex-direction: row;
    align-items: start;
  }
`;

const Tab = styled.div`
  min-width: 50vw;
`;
