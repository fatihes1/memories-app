import { AUTH, LOGOUT} from "../../constants/actionTypes";


const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			// console.log(action?.data);
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };
		case LOGOUT:
			return action.payload;
		default:
			return state;
	}
};

export default authReducer;
