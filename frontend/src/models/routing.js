import { createContext, useContext } from 'react';
import { createAction, handleActions } from 'redux-actions';
// import qs from 'qs';

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

			PUSH_ROUTE: (state, action) => ({
				...state,
				...action.payload,
			}),

			REPLACE_ROUTE: (state, action) => ({
				...state,
				...action.payload,
			}),
		},
		{ ...history.location },
	),
};

// const getQueries = search => {
// 	const queries = {};

// 	if (search) {
// 		const queryStr = search.split('?')[1];
// 		const queryPairs = queryStr.split('&');

// 		queryPairs.forEach(query => {
// 			const [key, value] = query.split('=');
// 			queries[key] = value.includes('%2B') ? value.split('%2B').join('+') : decodeURI(value);
// 		});
// 	}

// 	return queries;
// };

export const pushRoute = createAction(
	'PUSH_ROUTE',
	({ search = '', state, ...props }, cb = () => {}) =>
		() => {
			const { search: oldSearch = '', pathname: oldPathname = '' } = history.location;
			// const queryObj = getQueries(oldSearch);

			history.push({
				...props,
				search, //qs.stringify(queryObj, { addQueryPrefix: true }),
				state: {
					prevPathname: oldPathname,
					prevSearch: oldSearch,
					...state,
				},
			});
			cb();

			return {
				...props,
				search,
				state: {
					prevPathname: oldPathname,
					prevSearch: oldSearch,
					...state,
				},
			};
		},
);

export const replaceRoute = createAction(
	'REPLACE_ROUTE',
	({ search = '', state, ...props }, cb = () => {}) =>
		() => {
			const { search: oldSearch = '', pathname: oldPathname = '' } = history.location;
			// const queryObj = getQueries(oldSearch);

			history.replace({
				...props,
				search, //qs.stringify(queryObj, { addQueryPrefix: true, encode: encodeURI }),
				state: {
					prevPathname: oldPathname,
					prevSearch: oldSearch,
					...state,
				},
			});
			cb();

			return {
				...props,
				search,
				state: {
					prevPathname: oldPathname,
					prevSearch: oldSearch,
					...state,
				},
			};
		},
);

export const HistoryContext = createContext({
	location: { pathname: '/' },
});

export const useHistory = () => useContext(HistoryContext);

const mapHooksToState = state => state.routing;

export const useRouting = () => useRedux(mapHooksToState, { routeChange, pushRoute, replaceRoute });

// eslint-disable-next-line
export default { reducer };
