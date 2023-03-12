import axios from "axios";
import { ADD_HACK_FAILURE, ADD_HACK_SUCCESS, DELETE_ONE_HACK_FAILURE, DELETE_ONE_HACK_SUCCESS, GET_HACKS_FAILURE, GET_HACKS_SUCCESS, GET_ONE_HACK_FAILURE, GET_ONE_HACK_SUCCESS, LOADING_HACKS, UPDATE_HACK_FAILURE, UPDATE_HACK_SUCCESS } from "../../action-type/action-type-hackbeauty";


// action to get all hacks
export const getAllHacks = () => async (dispatch) => {
  dispatch({
    type: LOADING_HACKS ,
  })
  try {
    const res = await axios.get("http://localhost:5000/api/beautyhack/hacks")
    dispatch({
      type: GET_HACKS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_HACKS_FAILURE,
      payload: err.message
    });
  }
}

// action to add a HACK
export const addHack = (hack, navigate) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const resHack = await axios.post('http://localhost:5000/api/beautyhack/hack', hack, { headers: { Authorization: `Bearer ${token}` } })
    dispatch({
      type: ADD_HACK_SUCCESS,
      payload: resHack.data
    });
    navigate(-1);
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // handle authentication error
      console.log("Not authorized to perform this action");
    } else {
      console.log(err);
      dispatch({
        type: ADD_HACK_FAILURE,
        payload: err.message
      });
    }
  }
}

// action to edit a HACK
export const edithack = (id, hack, navigate) => async (dispatch) => {
  try {
    const resHack = await axios.put(`http://localhost:5000/api/beautyhack/${id}`, hack);
    dispatch({
      type: UPDATE_HACK_SUCCESS,
      payload: resHack.data.product
    });
    dispatch(getAllHacks());
    navigate(-1);
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.log("Not authorized to perform this action");
    } else {
      console.log(err);
      dispatch({
        type: UPDATE_HACK_FAILURE,
        payload: err.message
      });
    }
  }
}

// action to get a single product
export const getOneHack = (id) => async (dispatch) => {
  dispatch({
    type: LOADING_HACKS,
  })
  try {
    const res = await axios.get(`http://localhost:5000/api/beautyhack/${id}`)
    dispatch({
      type: GET_ONE_HACK_SUCCESS,
      payload: res.data.hack
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ONE_HACK_FAILURE,
      payload: err.message
    });
  }
}

// action to delete a HACK
export const deletedHack = (id) => async (dispatch) => {
  const token=localStorage.getItem("token")
  if (window.confirm("Are you sure you want to delete this hack?")) {
    try {
      await axios.delete(`http://localhost:5000/api/beautyhack/${id}`,{ headers: { Authorization: `Bearer ${token}` } });
      dispatch({
        type: DELETE_ONE_HACK_SUCCESS,
      });
      dispatch(getAllHacks()); 
    } catch (err) {
      console.log(err);
      dispatch({
        type: DELETE_ONE_HACK_FAILURE,
      });
    }
  }
}
