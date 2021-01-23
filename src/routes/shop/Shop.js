import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components';
import Nav from '../../components/shop/nav/Nav';
import ShopNav from '../../components/shop/nav/ShopNav';
import Category from '../../routes/shop/Category';
import Cart from '../../routes/shop/checkout/Cart';
import Payment from '../../routes/shop/checkout/Payment';
import Personal from '../../routes/shop/checkout/Personal';
import Confirmation from '../../routes/shop/checkout/Confirmation';
import Favorite from '../../routes/shop/account/Favorite';
import ItemDetails from '../../routes/shop/ItemDetails';
import PublicRoute from '../../routes/types/PublicRoute';
import Entry from '../../routes/shop/account/Entry';
import HandleShop from '../HandleShop';
import Tracking from './orders/Tracking';
import Main from './Main';
import Footer from '../../components/shop/nav/Footer';
import NewIn from './NewIn';
import Design from './Design';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

function Shop({ match }) {

  return (
    <Wrapper>
      <header>
        <Nav />
        <ShopNav />
      </header>

      <Container>
        <Switch>
          <Route exact path={`${match.path}`} component={Main} />
          <PublicRoute exact path={`${match.path}/entry`} component={Entry} />
          <Route exact path={`${match.path}/cart`} component={Cart} />
          <Route exact path={`${match.path}/payment`} component={Payment} />
          <Route exact path={`${match.path}/personal`} component={Personal} />
          <Route exact path={`${match.path}/confirmation/:id`} component={Confirmation} />
          <Route exact path={`${match.path}/favorite`} component={Favorite} />
          <Route exact path={`${match.path}/tracking`} component={Tracking} />
          <Route exact path={`${match.path}/handleshop`} component={HandleShop} />
          <Route exact path={`${match.path}/item/:itemId`} component={ItemDetails} />
          <Route exact path={`${match.path}/new_in`} component={NewIn} />
          <Route exact path={`${match.path}/design/:id`} component={Design} />
          <Route exact path={`${match.path}/:category`} component={Category} />
        </Switch>
      </Container>

      <Footer />

    </Wrapper>
  )
}

export default Shop
