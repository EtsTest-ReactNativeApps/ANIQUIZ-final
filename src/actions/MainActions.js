import {
	DOWNLOAD,
	SET_KNOW_ANIME,
	UPDATE_TOTAL
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

export const updateTotal = (correct,wrong) => {
	return {
		type: UPDATE_TOTAL,
		payload: { correct, wrong }
	}
}