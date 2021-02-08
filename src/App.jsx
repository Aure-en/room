import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "react-modal";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import About from "./routes/general/About";
import Home from "./routes/general/Home";
import Contact from "./routes/general/Contact";
import Shop from "./routes/shop/Shop";
import Account from "./routes/account/Account";
import "./styles.css";

Modal.setAppElement("#root");
function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <FavoriteProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route path="/shop" component={Shop} />
              <Route path="/account" component={Account} />
            </Switch>
          </FavoriteProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
