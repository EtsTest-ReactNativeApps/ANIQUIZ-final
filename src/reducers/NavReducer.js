import { Router } from './../Router';

const INITIAL_STATE = Router.router.getStateForAction(Router.router.getActionForPathAndParams('start'));

export default (state = INITIAL_STATE, action) => {
	const nextState = Router.router.getStateForAction(action, state);

	return nextState || state;
}