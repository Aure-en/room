import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";
import About from "./routes/About"
import Home from "./routes/Home"
import Contact from "./routes/Contact"
import Entry from "./routes/shop/Entry"
import Category from "./routes/shop/Category"
import ItemDetails from "./routes/shop/ItemDetails";
import Cart from "./routes/shop/Cart";
import HandleShop from "./routes/HandleShop";
import Payment from "./routes/shop/Payment";

function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop/cart" component={Cart} />
          <Route exact path="/shop/payment" component={Payment} />
          <Route exact path="/shop" component={Entry} />
          <Route exact path="/shop/:category" component={Category} />
          <Route exact path="/shop/item/:itemId" component={ItemDetails} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/handleshop" component={HandleShop} />
        </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
