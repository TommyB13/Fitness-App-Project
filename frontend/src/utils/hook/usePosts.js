import { useRedux } from 'utils/hook/redux';
import { fetchPosts, fetchPostDetail, addPost } from 'models/post';

const selectPosts = state => state.post;

export const usePosts = () =>
    useRedux(selectPosts, {
        fetchPosts,
        fetchPostDetail,
        addPost,
    });
