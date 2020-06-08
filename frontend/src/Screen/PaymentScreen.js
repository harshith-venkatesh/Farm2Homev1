import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckOutSteps";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.table(e);
    dispatch(savePayment({ paymentMethod }));
    console.log(1);
    props.history.push("placeorder");
  };
  return (
    <React.Fragment>
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Payment</h2>
              </li>

              <li>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="paytm"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label htmlFor="paymentMethod">PayTm</label>
                </div>
              </li>
              {/* <li>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="gpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label htmlFor="paytm">GooglePay</label>
                </div>
              </li> */}
              <li>
                <button type="submit" className="button primary">
                  Continue
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PaymentScreen;
