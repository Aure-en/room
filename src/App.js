import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import PrivateRoute from './routes/types/PrivateRoute';
import PublicRoute from './routes/types/PublicRoute';
import About from './routes/About'
import Home from './routes/Home'
import Contact from './routes/Contact'
import Main from './routes/shop/Main'
import Category from './routes/shop/Category'
import ItemDetails from './routes/shop/ItemDetails';
import Cart from './routes/shop/checkout/Cart';
import HandleShop from './routes/HandleShop';
import Payment from './routes/shop/checkout/Payment';
import Personal from './routes/shop/checkout/Personal';
import Confirmation from './routes/shop/checkout/Confirmation';
import Entry from './routes/shop/account/Entry';
import Favorite from './routes/shop/account/Favorite';
import Orders from './routes/shop/account/Orders';
import Addresses from './routes/shop/account/Addresses';
import PaymentCards from './routes/shop/account/Payment';
import Settings from './routes/shop/account/Settings';

function App() {
  return (
    <Router>
      <div className='App'>
        <AuthProvider>
          <FavoriteProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/handleshop' component={HandleShop} />
              <Route exact path='/shop' component={Main} />
              <Route exact path='/shop/cart' component={Cart} />
              <Route exact path='/shop/payment' component={Payment} />
              <Route exact path='/shop/personal' component={Personal} />
              <Route exact path='/shop/confirmation/:id' component={Confirmation} />
              <Route exact path='/shop/favorite' component={Favorite} />
              <Route exact path='/shop/:category' component={Category} />
              <Route exact path='/shop/item/:itemId' component={ItemDetails} />
              <PublicRoute exact path='/account/entry' component={Entry} />
              <PrivateRoute exact path='/account/orders' component={Orders}/>
              <PrivateRoute exact path='/account/addresses' component={Addresses} />
              <PrivateRoute exact path='/account/payment' component={PaymentCards} />
              <PrivateRoute exact path='/account/user' component={Settings}/>
            </Switch>
          </FavoriteProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
