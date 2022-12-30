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
    COMMENT_MATCH
} from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";


/**
 * This function adds database to comment on the match with given id.
 * @param {string} value the comment that will be posted on match.
 * @param {*string} id id of the match that will be commented on.
 */
export const commentPost = (value, id) => async (dispatch) => {
    try {
        const API = '/matchcontroller/' + id + '/commentMatch';
        const { data } = await axios.post(API, {value});
        dispatch( { type: COMMENT_MATCH, payload: data});

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const addMatch = (match) => async (dispatch, getState) => {
	try {

		const API = "/matchcontroller/matches";
		const { data } = await axios.post(API, match);

		dispatch({ type: "MATCH_ADD_SUCCESS", payload: data });

	} catch (error) {
		dispatch({
			type: "MATCH_ADD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};