import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shipping, saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckOutSteps";

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push("payment");
  };
  return (
    <React.Fragment>
      <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Shipping</h2>
              </li>

              <li>
                <label htmlFor="address">Address: </label>
                <input
                  type="text"
                  name="name"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="city">City: </label>
                <input
                  type="text"
                  name="name"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="postalCode">Postal Code: </label>
                <input
                  type="Number"
                  name="name"
                  id="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="country">Country: </label>
                <input
                  type="text"
                  name="name"
                  id="country"
                  onChange={(e) => setCountry(e.target.value)}
                ></input>
              </li>

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

export default ShippingScreen;
