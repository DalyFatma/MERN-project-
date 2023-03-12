
import axios from "axios";
import { EDIT_USER_FAIL,
     EDIT_USER_SUCCESS, GET_USERS_FAIL, 
     GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_SUCCESS } from "../../action-type/action-type-admin";

// edit user by admin
export const editUserByAdmin = (userId,profile,navigate) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/editadmin/${userId}`,
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
      dispatch(getUserById());
      navigate(-1);
    } catch (error) {
      dispatch({ type: EDIT_USER_FAIL, payload: error });
    }
  };

  // action to get all users
export const getAllUsers = () => async (dispatch) => {
    dispatch({
      type: GET_USERS_LOADING,
    })
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        'http://localhost:5000/api/admin/users',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: GET_USERS_FAIL,
        payload: err.message
      });
    }
  }

  //get user by id 

  export const getUserById = (userId) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: res.data });
      //alert(res.data.msg)
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_USER_BY_ID_FAIL, payload: error });
    }
  };