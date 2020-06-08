import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProducts,
} from "../actions/productActions";

function EntryProductScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setRating(product.rating);
    setNumReviews(product.numReviews);
    setDescription(product.description);
  };
  const submitHandler = (e) => {
    console.table("something");
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating,
        numReviews,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProducts(product._id));
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>

        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
        <p>{"  "}</p>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading....</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price: </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  id={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image: </label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="category">Category: </label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="brand">Brand: </label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">Count In Stock: </label>
                <input
                  type="number"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="rating">Rating: </label>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="numReviews">Number of Reviews: </label>
                <input
                  type="number"
                  name="numReviews"
                  id="numReviews"
                  value={numReviews}
                  onChange={(e) => setNumReviews(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description: </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : " Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id} </td>
                <td>{product.name} </td>
                <td>{product.price} </td>
                <td>{product.category} </td>
                <td>{product.brand} </td>
                <td>{product.description} </td>

                <td>
                  <button
                    className="button secondary"
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>
                  {"   "}
                  <button
                    className="button secondary"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EntryProductScreen;
