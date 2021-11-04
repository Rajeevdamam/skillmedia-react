import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
	ALL_POSTS,
	DELETE_POST,
	ADD_POST,
	LOGGED_IN,
	POST_DETAILS,
	ADD_COMMENT,
	DELETE_COMMENT,
	LIKE_POST,
	LIKE_COMMENT,
	USER_PROFILE,
	USER_POSTS,
	SEARCHED_USERS,
} from "../store/constants";
const loginUser = async (data: any) => {
	try {
		let response = await axios.post(
			`${baseUrl}users/login`,
			JSON.stringify(data),
			{ headers: { "Content-Type": "application/json" } }
		);
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("user", response.data.user);
		localStorage.setItem("userID", response.data.userId);
		return { type: LOGGED_IN, payload: localStorage.getItem("user") };
	} catch (err: any) {
		console.log(err.message);
		return null;
	}
};

const likeApi = async (postID: any) => {
	try {
		const result = await axios.post(
			`${baseUrl}likes/toggle/${postID}`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("token"),
				},
			}
		);
		return {
			type: LIKE_POST,
			payload: result.data.count,
		};
	} catch (err: any) {}
};
const signupUser = async (data: any) => {
	try {
		let response = await axios.post(`${baseUrl}users`, JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
		return response;
	} catch (err) {
		return null;
	}
};

const displayAllPosts = async () => {
	const res = await axios.get(`${baseUrl}posts`, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return {
		type: ALL_POSTS,
		payload: res.data,
	};
};

const getPostsByCategory = async (data: any) => {
	const res = await axios.get(`${baseUrl}posts/category/${data}`);
	return {
		type: "DISPLAY_POSTS_BY_CATEGORY",
		payload: res.data,
	};
};

const deleteComment = async (data: any) => {
	const res = await axios.delete(`${baseUrl}comments/${data}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
		},
	});
	return {
		type: DELETE_COMMENT,
		commentLength: res.data.comments.length,
	};
};

const addComment = async (data: any) => {
	let res = await axios.post(`${baseUrl}comments`, JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
		},
	});

	return {
		type: ADD_COMMENT,
		commentLength: res.data.comments.length,
	};
};

const addPost = async (data: any) => {
	try {
		const res = await axios.post(`${baseUrl}posts`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		});
		return { type: ADD_POST };
	} catch (err) {
		console.log(err);
		return err;
	}
};

const currentUserProfile = async (data: any) => {
	try {
		const res = await axios.get(`${baseUrl}users/profile/${data}`);
		return { type: USER_PROFILE, payload: res.data };
	} catch (err) {
		return null;
	}
};

const currentUserPosts = async (data: any) => {
	try {
		const res = await axios.get(`${baseUrl}users/posts/${data}`);
		return { type: USER_POSTS, payload: res.data };
	} catch (err) {
		return null;
	}
};
const getPostDetails = async (postid: any) => {
	try {
		const postDetails = await axios.get(
			`${baseUrl}posts/comments/postid/${postid}`
		);
		return { type: POST_DETAILS, payload: postDetails.data };
	} catch (err) {
		return err;
	}
};

const likeCommentApi = async (data: any) => {
	const res = await axios.post(
		`${baseUrl}likes/comments/${data}`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		}
	);
	return {
		type: LIKE_COMMENT,
		payload: res.data.count,
	};
};

const deletePost = async (postID: any) => {
	try {
		console.log("2. in services");
		const res = await axios.delete(`${baseUrl}posts/${postID}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		});
		return { type: DELETE_POST };
	} catch (err) {
		return err;
	}
};

const getUsersByName = async (name: any) => {
	try {
		const res = await axios.get(`${baseUrl}users/byname/${name}`);
		return { type: SEARCHED_USERS, payload: res.data };
	} catch (err) {
		return err;
	}
};

const searchedUserProfile = async (name: any) => {
	try {
		const res = await axios.get(`${baseUrl}users/byname/${name}`);
		return { type: USER_PROFILE, payload: res.data };
	} catch (err) {
		return err;
	}
};

const searchedUserPosts = async (name: any) => {
	try {
		const res = await axios.get(`${baseUrl}posts/userName/${name}`);
		return { type: USER_POSTS, payload: res.data };
	} catch (err) {
		return err;
	}
};

export {
	loginUser,
	signupUser,
	displayAllPosts,
	getPostsByCategory,
	addPost,
	addComment,
	currentUserProfile,
	getPostDetails,
	deleteComment,
	likeApi,
	likeCommentApi,
	currentUserPosts,
	deletePost,
	getUsersByName,
	searchedUserProfile,
	searchedUserPosts,
};
