import axios from "axios";

export const addNews = (news) => async (dispatch, getState) => {
	try {

		const API = "/newscontroller/news";
		const { data } = await axios.post(API, news);

		dispatch({ type: "NEWS_ADD_SUCCESS", payload: data });

	} catch (error) {
		dispatch({
			type: "NEWS_ADD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};