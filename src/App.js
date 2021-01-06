import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { FirestoreProvider } from './contexts/FirestoreContext';
import { StorageProvider } from './contexts/StorageContext';
import { AuthProvider } from './contexts/AuthContext';
import About from './routes/About.js'
import Home from './routes/Home.js'
import Contact from './routes/Contact.js'
import ShopEntry from './routes/ShopEntry.js'
import ShopCategory from './routes/ShopCategory.js'
import HandleShop from './routes/HandleShop.js'
import ShopItemDetails from './routes/ShopItemDetails';

function App() {
  return (
    <Router>
      <div className='App'>
      <AuthProvider>
        <FirestoreProvider>
          <StorageProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={ShopEntry} />
                <Route exact path="/shop/:category" component={ShopCategory} />
                <Route exact path='/shop/item/:itemId' component={ShopItemDetails} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/handleshop" component={HandleShop} />
              </Switch>
            </StorageProvider>
          </FirestoreProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
