import React from "react";
function CheckoutSteps(props) {
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? "active" : "empty"}>SignIn</div>
      <div className={props.step2 ? "active" : "empty"}>Shipping</div>
      <div className={props.step3 ? "active" : "empty"}>Payment</div>
      <div className={props.step4 ? "active" : "empty"}>Place Order</div>
    </div>
  );
}

export default CheckoutSteps;
