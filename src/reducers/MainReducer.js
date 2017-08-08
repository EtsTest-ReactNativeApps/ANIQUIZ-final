import {
	DOWNLOAD
} from './../actions/types';
import {REHYDRATE} from 'redux-persist/constants';

const INITIAL_STATE = {
	downloaded: false,
};

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case REHYDRATE:
			return action.payload.main || [];
		case DOWNLOAD:
			return { ...state, downloaded: true };
		default:
			return state;
	}
}