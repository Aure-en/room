import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './routes/About.js'
import Home from './routes/Home.js'
import Contact from './routes/Contact.js'

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
