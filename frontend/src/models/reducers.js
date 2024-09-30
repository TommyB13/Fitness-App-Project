import { combineReducers } from 'redux';

import routing from './routing';
import auth from './auth';
import user from './user';

export default combineReducers({
	...routing.reducer,
	...auth.reducer,
	...user.reducer,
});
