import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { logout } from "../actions/userActions";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());

    return () => {
      //
    };
  }, []);

  return loading ? (
    <div>Loading.........</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <ul className="products">
        {products.map((product, i) => (
          <li key={i}>
            <div className="product">
              <Link to={"/products/" + product._id}>
                <img
                  className="product-image"
                  alt="onion"
                  src={product.image}
                />
              </Link>

              <div className="product-name">
                <Link to={"/products/" + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand} </div>

              <div className="product-price">&#x20B9; {product.price} </div>
              <div className="product-rating">
                {product.rating} Stars ({product.numReviews} reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomeScreen;
