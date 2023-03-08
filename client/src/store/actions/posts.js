import * as api from '../../api';
import { FETCH_ALL, LIKE, UPDATE, DELETE, CREATE, FETCH_BY_SEARCH,START_LOADING, END_LOADING  } from "../../constants/actionTypes";
// Action Creators --> Function return action

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error.message);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try{
		dispatch({ type: START_LOADING });
		const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
		// console.log(data);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	// console.log(post);
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error.message);
	}
}

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id })
	} catch (error) {
		console.log(error)
	}
}

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		
		dispatch({ type: LIKE, payload: data })
	
	} catch (error) {
		console.log(error)
	}
}