import {
	DOWNLOAD,
	SET_KNOW_ANIME,
	UPDATE_TOTAL
} from './../actions/types';
import { animeList } from './AnimeList';

const INITIAL_STATE = {
	downloaded: 'empty',
	point: 0,
	totalCorrect: 0,
	totalQuiz: 0,
	totalWrong: 0,
	animeResult: animeList,
	...animeList
};

const convertArray = (arr) => {
	let tempArr = [];
	let tempObj = {};
	for (var i = 0; i < arr.length; i++) {
		tempArr.push(Object.keys(arr[i])[0]);
	}
	for (var i = 0; i < tempArr.length; i++) {
		tempArr[i] = tempArr[i].split(",");
	}
	tempArr = [].concat.apply([],tempArr);
	for (var i = 0; i < tempArr.length; i++) {
		if (tempObj[tempArr[i].trim()] === undefined) {
			tempObj[tempArr[i].trim()] = 1;
		} else {
			tempObj[tempArr[i].trim()] += 1;
		}	
	}
	return tempObj;
}

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case DOWNLOAD:
			return { ...state, downloaded: action.payload };
		case SET_KNOW_ANIME:
			let temp = {};
			temp[action.payload.anime] = action.payload.value;
			return { ...state, ...temp };
		case UPDATE_TOTAL:
			const { correct, wrong } = action.payload;
			
			let c = convertArray(correct);
			let w = convertArray(wrong);
			
			let tempAnimeResult = state.animeResult;

			for(var anime in c) {
				if (!tempAnimeResult[anime] || tempAnimeResult[anime] === undefined) {
					tempAnimeResult[anime] = {correct:0,wrong:0}
				} 
				tempAnimeResult[anime].correct+=c[anime];
			}

			for(var anime in w) {
				if (!tempAnimeResult[anime] || tempAnimeResult[anime] === undefined) {
					tempAnimeResult[anime] = {correct:0,wrong:0}
				} 
				tempAnimeResult[anime].wrong+=w[anime];
			}

			return { 
				...state, 
				totalCorrect: (state.totalCorrect+correct.length), 
				totalWrong: (state.totalWrong+wrong.length),
				totalQuiz: (state.totalQuiz+correct.length+wrong.length),
				animeResult: tempAnimeResult
			}
		default:
			return state;
	}
}