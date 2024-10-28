import { createAction, handleActions } from 'redux-actions';
// import dayjs from 'dayjs';

import { wrapAuthFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';

export const fetchPosts = createAction('FETCH_POSTS', () => async () => {
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

const defaultTargetPostData = {
	postId: '',
	user: '',
	userId: '',
	challenge: '',
	comments: [],
	completed: false,
	content: '',
	id: '',
	imgUrl: '',
	percentage: 0,
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
	});

export default { reducer };
