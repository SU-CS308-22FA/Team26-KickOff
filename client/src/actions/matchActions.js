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