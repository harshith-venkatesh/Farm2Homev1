import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRatings from "react-star-ratings";
import Carousel from "react-bootstrap/Carousel";

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
      <Carousel
        controls={false}
        indicators
        interval={2500}
        pauseOnHover={false}
        className="carousel"
      >
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetables-fruit-healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Fresh From Farm</h3>
            <p style={{ color: "grey", fontWeight: "bold" }}>
              Organic vegetbles for Healthy Life
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            alt="Second slide"
            src="https://img.buzzfeed.com/buzzfeed-static/static/2018-08/28/14/campaign_images/buzzfeed-prod-web-05/17-tricks-to-help-you-eat-healthy-without-even-tr-2-22264-1535482289-4_dblbig.jpg"
          />

          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            alt="Third slide"
            src="https://nexgenhomeandseniorcare.com/wp-content/uploads/2019/03/iStock512628566_jpg-produce-bounty.jpg"
          />

          {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>

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
                <StarRatings
                  rating={product.rating}
                  starRatedColor="yellow"
                  //changeRating={this.changeRating}
                  starDimension="25px"
                  starSpacing="05px"
                  numberOfStars={5}
                  name="rating"
                />
                ({product.numReviews} reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomeScreen;
