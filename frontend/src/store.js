import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  productReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducer";
import Cookie from "js-cookie";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { userSignReducer, userRegisterReducer } from "./reducers/userReducer";

const cartItems = Cookie.getJSON("carItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignIn: { userInfo },
};
const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
