import React from 'react';
import styled from 'styled-components';
import { Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Nav from '../../components/shop/nav/Nav';
import ShopNav from '../../components/shop/nav/ShopNav';
import AccountNav from '../../components/account/AccountNav';
import PrivateRoute from '../types/PrivateRoute';
import Orders from '../account/settings/Orders';
import Addresses from '../account/settings/Addresses';
import PaymentCards from '../account/settings/Payment';
import Settings from '../account/settings/Settings';

const Container = styled.div`
  display: grid;
  margin: 5rem;
  grid-template-columns = auto 1fr;
  justify-content: center;
  align-content: center;
`;

const Content = styled.div`
  display: flex;
`;

const Tab = styled.div`
  min-width: 50vw;
`;

function Account({ match }) {
  const { currentUser } = useAuth();
  const currentLinkId = useRouteMatch('/account/:id').params.id;

  return (
    <>
      {currentUser && !currentUser.isAnonymous ? (
        <div>
          <header>
            <Nav />
            <ShopNav />
          </header>

          <Container>
            <Content>
              <AccountNav
                currentLink={currentLinkId}
              />
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
        <Redirect to='/shop/entry' />
      )}
    </>
  );
}

export default Account;
