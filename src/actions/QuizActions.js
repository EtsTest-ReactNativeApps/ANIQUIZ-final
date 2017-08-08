import {
	CHECK_ANSWER,
	RESET_QUIZ,
	SET_DECK,
	SET_MODE,
	COUNT_DOWN,
	STOP_TIMER,
	SET_TIMER,
	LIGHTBOX,
	SELECT_LIGHTBOX_IMAGE,
	SET_INDEX,
	SET_HINT,
	RESET_ANSWER,
	SET_HINT_NUM
} from './types';

let timer = null;

export const checkAnswer = (correct) => {
	return {
		type: CHECK_ANSWER,
		payload: correct
	}
}

export const lightbox = (title,question) => {
	return {
		type: LIGHTBOX,
		payload: { title, question }
	}
}

export const resetQuiz = () => {
	return {
		type: RESET_QUIZ
	}
}

export const setMode = (mode) => {
	return {
		type: SET_MODE,
		payload: mode
	}
}

export const setDeck = (deck) => {
	return {
		type: SET_DECK,
		payload: deck
	}
}

export const selectLightboxImage = (image) => {
	return {
		type: SELECT_LIGHTBOX_IMAGE,
		payload: image
	}
}

export const startTimer = () => {
	return (dispatch) => {
		clearInterval(timer);
		dispatch({type: SET_TIMER});
		timer = setInterval(() => dispatch({type: COUNT_DOWN}), 1000);
	}
}

export const stopTimer = () => {
	return (dispatch) => {
		clearInterval(timer);
		dispatch({type:STOP_TIMER});
	}
}

export const setIndex = (index) => {
	return {
		type: SET_INDEX,
		payload: index
	}
}

export const setHint = (hint) => {
	return {
		type: SET_HINT,
		payload: hint
	}
}

export const resetAnswer = () => {
	return {
		type: RESET_ANSWER
	}
}

export const setHintNum = (hintNum) => {
	return {
		type: SET_HINT_NUM,
		payload: hintNum
	}
}