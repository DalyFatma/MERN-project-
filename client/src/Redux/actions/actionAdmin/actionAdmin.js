
import axios from "axios";
import { ADD_USER_FAIL, ADD_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS, EDIT_USER_FAIL,
     EDIT_USER_SUCCESS, GET_USERS_FAIL, 
     GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_SUCCESS, SET_USERS }
      from "../../action-type/action-type-admin";

// edit user by admin
export const editUserByAdmin = (id,profile,navigate) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/editadmin/${id}`,
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
      dispatch(getAllUsers());
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

  export const getUserById = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      console.log(id);
      const res = await axios.get(`http://localhost:5000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: GET_USER_BY_ID_SUCCESS,payload: res.data  });
      //alert(res.data.msg)
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_USER_BY_ID_FAIL, payload: error });
    }
  };

  //add user

  export const addUser = (user, navigate) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
      const resUser = await axios.post('http://localhost:5000/api/admin/user', user, { headers: { Authorization: `Bearer ${token}` } })
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: resUser.data
      });
      navigate(-1);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // handle authentication error
        console.log("Not authorized to perform this action");
      } else {
        console.log(err);
        dispatch({
          type: ADD_USER_FAIL,
          payload: err.message
        });
      }
    }
  }

  //delete user 

  export const deletedUser = (id,navigate) => async (dispatch) => {
    const token=localStorage.getItem("token")
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/${id}`,{ headers: { Authorization: `Bearer ${token}` } });
        dispatch({
          type: DELETE_USER_SUCCESS,
        });
        dispatch(getAllUsers()); 
        navigate(-1);
      } catch (err) {
        console.log(err);
        dispatch({
          type: DELETE_USER_FAIL,
        });
      }
    }
  }

  export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users,
  });