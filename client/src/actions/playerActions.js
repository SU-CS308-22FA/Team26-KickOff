import axios from "axios";

export const addPlayer = (player) => async (dispatch, getState) => {
	try {

		const API = "/api/player";
		const { data } = await axios.post(API, player);

		dispatch({ type: "PLAYER_ADD_SUCCESS", payload: data });

	} catch (error) {
		dispatch({
			type: "PLAYER_ADD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};