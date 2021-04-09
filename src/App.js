import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './Components/Inventory/Inventory';
import Review from './Components/Review/Review';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h1>Name: { loggedInUser.name}</h1>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route exact path="/">
            <Shop/>
          </Route>
          <Route path="/manage">
            <Inventory/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          {/* <PrivateRoute path="/shipment">
            <Shipment/>
          </PrivateRoute> */}
          <Route path="/shipment">
            <Shipment/>
          </Route>
          <Route path="/review">
            <Review/>
          </Route>
          <Route path="/product/:productId">
            <ProductDetails/>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
