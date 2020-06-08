import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { logout } from "../actions/userActions";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 0;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {
      //
    };
  }, []);
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  //console.table(productId, qty);
  return (
    <React.Fragment>
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li key={productId}>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {cartItems.length === 0 ? (
              <div>
                Cart is empty
                {"     "}{" "}
                <Link to="/">
                  <a>Go to Home Screen</a>
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <li>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <Link to={"/product/" + item.product}>
                      <div>{item.name}</div>
                    </Link>

                    <div>
                      Qty:
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <button
                        type="button"
                        className="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="cart-price"> &#8377; {item.price}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="cart-action">
          <h3>
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
            &#8377;
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button
            className="button primary full-width"
            disabled={cartItems.length === 0}
            onClick={checkOutHandler}
          >
            Proceed To Checkout
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="button secondary full-width"
          >
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CartScreen;
