import axios from "axios";


export const addUpcomingMatch = (upcomingMatch) => async (dispatch, getState) => {
	try {

		const API = "/upcomingmatchcontroller/upcomingmatches";
		const { data } = await axios.post(API, upcomingMatch);

		dispatch({ type: "UPCOMINGMATCH_ADD_SUCCESS", payload: data });

	} catch (error) {
		dispatch({
			type: "UPCOMINGMATCH_ADD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};