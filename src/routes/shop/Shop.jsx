import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import Nav from "../../components/shop/nav/Nav";
import ShopNav from "../../components/shop/nav/ShopNav";
import Footer from "../../components/shop/nav/Footer";
import Favorite from "../account/Favorite";
import Entry from "../account/Entry";
import PublicRoute from "../types/PublicRoute";
import HandleShop from "../general/HandleShop";
import Tracking from "./orders/Tracking";
import Category from "./display/Category";
import ItemDetails from "./display/ItemDetails";
import Main from "./display/Main";
import NewIn from "./display/NewIn";
import Design from "./display/Design";
import Cart from "./checkout/Cart";
import Payment from "./checkout/Payment";
import Personal from "./checkout/Personal";
import Confirmation from "./checkout/Confirmation";

function Shop({ match }) {
  const { windowSize } = useWindowSize();

  return (
    <Wrapper>
      <header>
        <Nav />
        {windowSize.width > 500 && <ShopNav />}
      </header>

      <Container>
        <Switch>
          <Route exact path={`${match.path}`} component={Main} />
          <PublicRoute exact path={`${match.path}/entry`} component={Entry} />
          <Route exact path={`${match.path}/cart`} component={Cart} />
          <Route exact path={`${match.path}/payment`} component={Payment} />
          <Route exact path={`${match.path}/personal`} component={Personal} />
          <Route
            exact
            path={`${match.path}/confirmation/:id`}
            component={Confirmation}
          />
          <Route exact path={`${match.path}/favorite`} component={Favorite} />
          <Route exact path={`${match.path}/tracking`} component={Tracking} />
          <Route
            exact
            path={`${match.path}/handleshop`}
            component={HandleShop}
          />
          <Route
            exact
            path={`${match.path}/item/:itemId`}
            render={(props) => (
              <ItemDetails key={props.match.params.itemId} {...props} />
            )}
          />
          <Route exact path={`${match.path}/new_in`} component={NewIn} />
          <Route exact path={`${match.path}/design/:id`} component={Design} />
          <Route exact path={`${match.path}/:category`} component={Category} />
        </Switch>
      </Container>

      <Footer />
    </Wrapper>
  );
}

Shop.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      itemId: PropTypes.string,
    }),
  }),
};

Shop.defaultProps = {
  match: {
    path: "",
  },
};

export default Shop;

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
