import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import About from './routes/About'
import Home from './routes/Home'
import Contact from './routes/Contact'
import Shop from './routes/shop/Shop'
import Account from './routes/shop/account/Account';
import Modal from 'react-modal';

Modal.setAppElement('#root');
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
              <Route path='/shop' component={Shop} />
              <Route path='/account' component={Account} />
            </Switch>
          </FavoriteProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
