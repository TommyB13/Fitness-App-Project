import { combineReducers } from 'redux';

import routing from './routing';
import auth from './auth';

export default combineReducers({
	...routing.reducer,
	...auth.reducer,
});
