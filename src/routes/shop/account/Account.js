import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import AccountNav from '../../../components/shop/account/AccountNav';
import PrivateRoute from '../../../routes/types/PrivateRoute';
import Orders from '../../../routes/shop/account/Orders';
import Addresses from '../../../routes/shop/account/Addresses';
import PaymentCards from '../../../routes/shop/account/Payment';
import Settings from '../../../routes/shop/account/Settings';

const Container = styled.div`
  display: flex;
  margin: 5rem;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
`;

const Tab = styled.div`
  min-width: 50vw;
`;

function Account({ match }) {

  return (
    <div>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <Content>
          <AccountNav currentLink={useRouteMatch('/account/:id').params.id}/>
          <Switch>
            <Tab>
              <PrivateRoute exact path={`${match.path}/orders`} component={Orders}/>
              <PrivateRoute exact path={`${match.path}/addresses`} component={Addresses} />
              <PrivateRoute exact path={`${match.path}/payment`} component={PaymentCards} />
              <PrivateRoute exact path={`${match.path}/user`} component={Settings}/>
            </Tab>
          </Switch>
        </Content>
      </Container>

    </div>
  )
}

export default Account