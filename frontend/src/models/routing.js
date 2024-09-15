import { createContext, useContext } from 'react';
import { createAction, handleActions } from 'redux-actions';

import { useRedux } from 'utils/hook/redux';

import history from 'store/history';

export const routeChange = createAction('ROUTE_LOCATION_CHANGE', location => location);

const reducer = {
	routing: handleActions(
		{
			ROUTE_LOCATION_CHANGE: (state, action) => ({
				...state,
				...action.payload,
			}),
		},
		{ ...history.location },
	),
};

export const pushRoute = createAction('REPLACE_ROUTE', (pathname, cb = () => {}) => () => {
	history.push(pathname);
	cb();
});

export const replaceRoute = createAction('REPLACE_ROUTE', (pathname, cb = () => {}) => () => {
	history.replace(pathname);
	cb();
});

export const HistoryContext = createContext({
	location: { pathname: '/' },
});

export const useHistory = () => useContext(HistoryContext);

const mapHooksToState = state => state.routing;

export const useRouting = () => useRedux(mapHooksToState, { pushRoute, replaceRoute });

export default { reducer };
