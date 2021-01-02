import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { FirestoreProvider } from './contexts/FirestoreContext';
import About from './routes/About.js'
import Home from './routes/Home.js'
import Contact from './routes/Contact.js'
import Shop from './routes/Shop.js'

function App() {
  return (
    <Router>
      <div className='App'>
      <FirestoreProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </FirestoreProvider>
      </div>
    </Router>
  );
}

export default App;
