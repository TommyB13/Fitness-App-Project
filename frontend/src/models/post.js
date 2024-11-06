import { createAction, handleActions } from 'redux-actions';
// import dayjs from 'dayjs';

import { pushRoute } from 'models/routing';

import { wrapAuthFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';

import routePath from 'constants/path';

export const fetchPosts = createAction('FETCH_POSTS', async () => {
	const { data } = await wrapAuthFetch('posts');

	return data;
	// return data.data.map(d => ({
	// 	...d,
	// 	published_at: isExist(d.published_at)
	// 		? dayjs(d.published_at).format('YYYY 年 MM 月 DD 日')
	// 		: '',
	// }));
});

export const fetchPostDetail = createAction('FETCH_POST_DETAIL', () => async (_, getState) => {
	const {
		routing: { pathname },
	} = getState();
	const postId = pathname.split('/')[2];

	const { data } = await wrapAuthFetch(`posts/${postId}`, {
		method: 'GET',
	});

	return {
		...data.data,
		// published_at: isExist(data.data.published_at)
		// 	? dayjs(data.data.published_at).format('YYYY 年 MM 月 DD 日')
		// 	: '',
	};
});

export const addPost = createAction('ADD_POST', newPost => async dispatch => {
	const { data } = await wrapAuthFetch('post', {
		method: 'POST',
		body: JSON.stringify(newPost),
	});

	await dispatch(
		pushRoute({ pathname: routePath.homepage, search: '' }, () => {
			window.location.href = '/';
		}),
	);

	return data;
});

const defaultTargetPostData = {
	postId: '',
	userId: '',
	challenge: '',
	completed: false,
	content: '',
	imgUrl: '',
	percentage: 0,
	comments: [],
};

const reducer = {
	post: handleActions(
		{
			FETCH_POSTS_FULFILLED: (state, action) => ({
				...state,

				posts: action.payload,
			}),

			FETCH_POST_DETAIL_FULFILLED: (state, action) => ({
				...state,

				targetPost: action.payload,
			}),
		},
		{
			posts: [],
			targetPost: defaultTargetPostData,
		},
	),
};

const selectPosts = state => state.post;

export const usePosts = () =>
	useRedux(selectPosts, {
		fetchPosts,
		fetchPostDetail,
		addPost,
	});

export default { reducer };
