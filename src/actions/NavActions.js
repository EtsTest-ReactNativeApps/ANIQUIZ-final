import { NavigationActions } from 'react-navigation';

export const navigate = (routeName) => {
	return (dispatch) => {
		dispatch(NavigationActions.navigate({ routeName }));
	}
}

export const back = ()=> {
	return (dispatch) => {
		dispatch(NavigationActions.back());
	}
}