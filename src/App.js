import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { FirestoreProvider } from './contexts/FirestoreContext';
import { StorageProvider } from './contexts/FirestoreStorage';
import About from './routes/About.js'
import Home from './routes/Home.js'
import Contact from './routes/Contact.js'
import ShopCategory from './routes/ShopCategory.js'
import HandleShop from './routes/HandleShop.js'
import ShopItemDetails from './routes/ShopItemDetails';

function App() {
  return (
    <Router>
      <div className='App'>
      <FirestoreProvider>
        <StorageProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/shop" component={ShopCategory} />
              <Route exact path='/shop/:id' component={ShopItemDetails} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/handleshop" component={HandleShop} />
            </Switch>
          </StorageProvider>
        </FirestoreProvider>
      </div>
    </Router>
  );
}

export default App;
