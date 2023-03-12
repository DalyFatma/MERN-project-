import axios from "axios";
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_SUCCESS, DELETE_ONEPRODUCTS_FAIL, DELETE_ONEPRODUCTS_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_SUCCESS, GET_ALLPRODUCTS_FAIL, GET_ALLPRODUCTS_SUCCESS, GET_ONEPRODUCTS_FAIL, GET_ONEPRODUCTS_SUCCESS, LOADINGPRODUCTS } from "../../action-type/action-type-product";

// action to get all products
export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: LOADINGPRODUCTS,
  })
  try {
    const res = await axios.get("http://localhost:5000/api/product/products")
    dispatch({
      type: GET_ALLPRODUCTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ALLPRODUCTS_FAIL,
      payload: err.message
    });
  }
}

// action to add a product
export const addProduct = (productBody, navigate) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const resProduct = await axios.post('http://localhost:5000/api/product/product', productBody, { headers: { Authorization: `Bearer ${token}` } })
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: resProduct.data
    });
    navigate('/dashboard');
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // handle authentication error
      console.log("Not authorized to perform this action");
    } else {
      console.log(err);
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: err.message
      });
    }
  }
}

// action to edit a product
export const editProduct = (id, productBody, navigate) => async (dispatch) => {
  try {
    const resProduct = await axios.put(`http://localhost:5000/api/product/${id}`, productBody);
    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: resProduct.data.product
    });
    dispatch(getAllProducts());
    navigate('/dashboard');
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.log("Not authorized to perform this action");
    } else {
      console.log(err);
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload: err.message
      });
    }
  }
}

// action to get a single product
export const getOneProduct = (id) => async (dispatch) => {
  dispatch({
    type: LOADINGPRODUCTS,
  })
  try {
    const res = await axios.get(`http://localhost:5000/api/product/${id}`)
    dispatch({
      type: GET_ONEPRODUCTS_SUCCESS,
      payload: res.data.product
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ONEPRODUCTS_FAIL,
      payload: err.message
    });
  }
}

// action to delete a product
export const deletedProduct = (id) => async (dispatch) => {
  const token=localStorage.getItem("token")
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`,{ headers: { Authorization: `Bearer ${token}` } });
      dispatch({
        type: DELETE_ONEPRODUCTS_SUCCESS,
      });
      dispatch(getAllProducts()); 
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_ONEPRODUCTS_FAIL,
      });
    }
  }
}
