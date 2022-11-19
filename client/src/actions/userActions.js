import axios from "axios";
import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";

export const login = (username, password) => async (dispatch) => {
    try {
      dispatch({type: USER_LOGIN_REQUEST});
      const {data} = await axios.post("/api/login", {
        username,
        password,
      });
      dispatch({type: USER_LOGIN_SUCCESS, payload: data});
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
};

export const deleteUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const API = "/api/user/" + userInfo._id;
		const { data } = await axios.delete(API);

		dispatch({ type: USER_DELETE_SUCCESS, payload: data });

		localStorage.removeItem("userInfo");
		dispatch({ type: USER_LOGOUT });

	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },} = getState();

		const config = {
			headers: 
			{
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const API = "/api/updateUser/" + userInfo._id
		const { data } = await axios.post(API, user);

		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};