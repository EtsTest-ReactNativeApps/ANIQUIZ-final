import {
	DOWNLOAD,
	SET_KNOW_ANIME
} from './../actions/types';
import { REHYDRATE } from 'redux-persist/constants';
import { animeList } from './AnimeList';

const INITIAL_STATE = {
	downloaded: 'empty',
	...animeList
};

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case REHYDRATE:
			return action.payload.main || [];
		case DOWNLOAD:
			return { ...state, downloaded: action.payload };
		case SET_KNOW_ANIME:
			let temp = {};
			temp[action.payload.anime] = action.payload.value;
			return { ...state, ...temp };
		default:
			return state;
	}
}