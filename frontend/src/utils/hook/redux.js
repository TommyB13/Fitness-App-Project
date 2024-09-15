import { bindActionCreators } from 'redux';

import { useSelector, useDispatch } from 'react-redux';

const defaultSelector = state => state;

export const useRedux = (originSelector, actions, options = {}) => {
	const selector = typeof originSelector !== 'function' ? defaultSelector : originSelector;

	const state = useSelector(selector, options.shouldHooksUpdate);
	const dispatch = useDispatch();

	if (typeof actions === 'undefined' || actions === null) {
		return [state, dispatch];
	}

	const boundActions =
		typeof actions === 'function' ? actions(dispatch) : bindActionCreators(actions, dispatch);

	return [state, boundActions];
};

export const useActions = actions => {
	const dispatch = useDispatch();

	if (typeof actions === 'undefined' || actions === null) {
		return dispatch;
	}

	const boundActions =
		typeof actions === 'function' ? actions(dispatch) : bindActionCreators(actions, dispatch);

	return boundActions;
};
