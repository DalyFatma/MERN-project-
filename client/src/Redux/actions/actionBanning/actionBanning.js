import { BAN_USER_FAILURE, BAN_USER_LOADING, BAN_USER_SUCCESS, UNBAN_USER_FAILURE, UNBAN_USER_LOADING, UNBAN_USER_SUCCESS } from "../../action-type/action-type-banned";
import axios from "axios";


export const banUser = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({ type: BAN_USER_LOADING });
  
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/${id}/ban`, {},{ headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      dispatch({ type: BAN_USER_SUCCESS, payload: res.data.user });
    } catch (error) {
      dispatch({
        type: BAN_USER_FAILURE,
        payload: error 
      });
    }
  };
  
  export const unbanUser = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({ type: UNBAN_USER_LOADING });
  
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/${id}/unban`,{},{ headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: UNBAN_USER_SUCCESS, payload: res.data.user });
    } catch (error) {
      dispatch({
        type: UNBAN_USER_FAILURE,
        payload: error 
      });
    }
  };
  