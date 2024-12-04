import { combineReducers } from 'redux';

import routing from './routing';
import auth from './auth';
import user from './user';
import post from './post';
import challenge from './challenge';

export default combineReducers({
	...routing.reducer,
	...auth.reducer,
	...user.reducer,
	...post.reducer,
	...challenge.reducer,
});
