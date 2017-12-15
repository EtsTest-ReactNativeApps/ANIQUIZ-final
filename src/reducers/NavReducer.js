import { Router } from './../Router';
import { NavigationActions } from 'react-navigation';

const INITIAL_STATE = { ...Router.router.getStateForAction(Router.router.getActionForPathAndParams('start')), previous: '' };
const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;

  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.previous
  ) ? state : getStateForAction(action, state);
};

Router.router.getStateForAction = navigateOnce(Router.router.getStateForAction);

export default (state = INITIAL_STATE, action) => {
	const nextState = { 
		...Router.router.getStateForAction(action, state), 
		previous: (action.type === NavigationActions.NAVIGATE || action.type === NavigationActions.BACK ? action.routeName : state.previous)};

	return nextState || state;
}