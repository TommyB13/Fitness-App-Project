import { createAction, handleActions } from 'redux-actions';
// import dayjs from 'dayjs';

import { pushRoute } from 'models/routing';

import { wrapAuthFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';

import routePath from 'constants/path';

export const fetchPosts = createAction('FETCH_POSTS', async () => {
	const { data } = await wrapAuthFetch('posts');

	return data;
});

export const fetchPostDetail = createAction('FETCH_POST_DETAIL', () => async (_, getState) => {
	const {
		routing: { pathname },
	} = getState();
	const postId = pathname.split('/')[2];
	const { data } = await wrapAuthFetch(`post/${postId}`, {
		method: 'GET',
	});

	return data;
});

export const fetchMyPosts = createAction('FETCH_MY_POSTS', async () => {
	const { data } = await wrapAuthFetch('posts/my');

	return data;
});

export const fetchMyPostDetail = createAction('FETCH_MY_POST_DETAIL', () => async (_, getState) => {
	const {
		routing: { pathname },
	} = getState();
	const postId = pathname.split('/')[3];

	const { data } = await wrapAuthFetch(`post/my/${postId}`, {
		method: 'GET',
	});

	return data;
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

export const updatePost = createAction('UPDATE_POST', form => async (dispatch, getState) => {
	const {
		routing: { pathname },
	} = getState();
	const postId = pathname.split('/')[3];

	const { data } = await wrapAuthFetch(`post/my/${postId}`, {
		method: 'PUT',
		body: JSON.stringify(form),
	});

	await dispatch(fetchMyPostDetail());

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

			FETCH_MY_POSTS_FULFILLED: (state, action) => ({
				...state,

				myPosts: action.payload,
			}),

			FETCH_MY_POST_DETAIL_FULFILLED: (state, action) => ({
				...state,

				targetPost: action.payload,
			}),
		},
		{
			posts: [],
			myPosts: [],
			targetPost: defaultTargetPostData,
		},
	),
};

const selectPosts = state => state.post;

export const usePosts = () =>
	useRedux(selectPosts, {
		fetchPosts,
		fetchPostDetail,
		fetchMyPosts,
		fetchMyPostDetail,
		addPost,
		updatePost,
	});

export default { reducer };
