import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckOutSteps";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  console.table(shipping, payment);
  if (!shipping.address) {
    props.history.push("/shipping");
  }
  if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  console.table(shipping);
  console.table(cartItems);
  console.table(payment);
  const dispatch = useDispatch();
  const placeOrderHandler = () => {};

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 20 ? 0 : 20;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    return () => {};
  }, []);
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  //console.table(productId, qty);
  return (
    <React.Fragment>
      <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeOrder">
          <div className="placeOrder-info">
            <div>
              <h3>Shipping</h3>
            </div>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalCode},{cart.shipping.country}
            </div>
            <div>
              <h3>Payment</h3>
            </div>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
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
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price"> &#8377; {item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="placeOrder-action">
            <ul>
              <li>
                <button
                  className="button primary full-width"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
              <li>
                <h3>Order Summary</h3>
              </li>
              <li>
                <div>Items</div>
                <div>&#8377;{itemsPrice} </div>
              </li>
              <li>
                <div>Shipping</div>
                <div>&#8377;{shippingPrice} </div>
              </li>
              <li>
                <div>Tax</div>
                <div>&#8377;{taxPrice} </div>
              </li>
              <li>
                <div>Order Total</div>
                <div>&#8377;{totalPrice} </div>
              </li>
            </ul>
            <h3>
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
              &#8377;
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PlaceOrderScreen;
