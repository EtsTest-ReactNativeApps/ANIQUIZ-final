import {
	APP_READY
} from './../actions/types';

const INITIAL_STATE = {
	ready: false
};

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case APP_READY:
			return { ...state, ready: true };
		default:
			return state;
	}
}