import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { FirestoreProvider } from "./contexts/FirestoreContext";
import { StorageProvider } from "./contexts/StorageContext";
import { AuthProvider } from "./contexts/AuthContext";
import About from "./routes/About.js"
import Home from "./routes/Home.js"
import Contact from "./routes/Contact.js"
import Entry from "./routes/shop/Entry.js"
import Category from "./routes/shop/Category.js"
import ItemDetails from "./routes/shop/ItemDetails";
import Cart from "./routes/shop/Cart";
import HandleShop from "./routes/HandleShop.js";

function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
        <FirestoreProvider>
          <StorageProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop/cart" component={Cart} />
                <Route exact path="/shop" component={Entry} />
                <Route exact path="/shop/:category" component={Category} />
                <Route exact path="/shop/item/:itemId" component={ItemDetails} />
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
