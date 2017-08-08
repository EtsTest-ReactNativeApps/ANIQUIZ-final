import { combineReducers } from 'redux';
import quiz from './QuizReducer';
import nav from './NavReducer';
import app from './AppReducer';
import main from './MainReducer';

export default combineReducers({
	quiz,
	nav,
	app,
	main
});