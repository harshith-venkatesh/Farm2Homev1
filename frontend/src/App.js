import React from "react";

import "./App.css";
import HomeScreen from "./Screen/HomeScreen";
import ProductScreen from "./Screen/ProductScreen";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CartScreen from "./Screen/CartScreen";
import SignInScreen from "./Screen/SignInScreen";
import { useSelector, useDispatch } from "react-redux";
import RegisterScreen from "./Screen/RegisterScreen";
import EntryProductScreen from "./Screen/EntryProductScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentScreen from "./Screen/PaymentScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import { logout } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, userInfo, error } = userSignIn;
  //console.log(userInfo);
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Farm2Home</Link>
          </div>
          <div className="header-links">
            <Link to="/cart/1">
              <a href="cart"> Cart </a>
            </Link>
            {userInfo ? (
              <>
                <Link to="/">{userInfo.data.name}</Link>
              </>
            ) : (
              <Link to="/signin">
                <a href="signin"> SignIn </a>
              </Link>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Vegetables</a>
            </li>
            <li>
              <a href="index.html">Fruits</a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/register" component={RegisterScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/cart/:id" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />

            <Route
              path="/products"
              component={EntryProductScreen}
              exact={true}
            />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
