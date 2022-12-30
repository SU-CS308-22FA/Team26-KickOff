import axios from "axios";


export const addTeam = (team) => async (dispatch, getState) => {
	try {

		const API = "/api/team";
		const { data } = await axios.post(API, team);

		dispatch({ type: "TEAM_ADD_SUCCESS", payload: data });

	} catch (error) {
		dispatch({
			type: "TEAM_ADD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};