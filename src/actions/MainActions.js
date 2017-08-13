import {
	DOWNLOAD,
	SET_KNOW_ANIME
} from './types';

export const download = (value) => {
	return {
		type: DOWNLOAD,
		payload: value
	}
}

export const setKnowAnime = (anime,value) => {
	return {
		type: SET_KNOW_ANIME,
		payload: { anime, value }
	}
}