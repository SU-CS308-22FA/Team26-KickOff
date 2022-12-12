import {
	COMMENT_MATCH
} from "../constants/userConstants";

export const commentMatchReducer = (state = {}, action) => {
	switch (action.type) {
		case COMMENT_MATCH:
			return { 
                ...state,
                matches: state.matches.map((match) => {
                    if(match._id === action.payload._id){
                        return action.payload;
                    }
                    return match;
                })
            };
		default:
			return state;
	}
};