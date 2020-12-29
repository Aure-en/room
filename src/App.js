import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home.js'

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
