import React, { useEffect } from "react";
import { Card } from "antd";

import "./card.css";
import { Image } from "antd";

import { useHistory } from "react-router";
import { deletePost, likeApi } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import { Avatar } from "@material-ui/core";
interface Props {
	data: any;
	flag: any;
	type?: any;
}

export default function CardComponent({ data, flag, type }: Props) {
	const { Meta } = Card;
	const history = useHistory();
	const dispatch = useDispatch();
	let userId = localStorage.getItem("userID");
	//

	const handleAddComment = (e: any) => {
		history.push(`/addComment/forPost/${data._id}`);
	};
	const likePost = async () => {
		let result = await likeApi(data._id);
		dispatch(result);
	};
	const liked = () => {
		for (let i of data.likes) {
			let id = i.user._id;
			if (id === userId) {
				return true;
			}
		}
		return false;
	};

	const viewProfile = (id: any, username: any) => {
		history.push("/profile/" + username, {
			userid: id,
			userName: username,
		});
	};

	const postDelete = async () => {
		console.log("1. in post delet");
		try {
			const result = await deletePost(data._id);
			dispatch(result);
			toast.info("Post deleted", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition: Zoom,
			});
		} catch (err) {
			toast.error("Could not delete post", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition: Zoom,
			});
		}
	};
	return (
		<div>
			{type === userId ? (
				<Card
					key={data._id}
					cover={
						data.image ? (
							<Image
								className="image"
								src={`https://skillmedia-server.herokuapp.com${data.image}`}
							/>
						) : (
							""
						)
					}
					actions={[
						<span onClick={likePost}>
							{liked() ? (
								<i
									className="fa fa-thumbs-up icon-style"
									aria-hidden="true"
								></i>
							) : (
								<i
									className="fa fa-thumbs-o-up icon-style"
									aria-hidden="true"
								></i>
							)}
							<span className="post-info">{data.likes.length}</span>
						</span>,
						<span onClick={handleAddComment}>
							<i
								className="fa fa-comments-o icon-style"
								title="Add comment"
								aria-hidden="true"
							></i>
							<span className="post-info">{data.comments.length}</span>
						</span>,
						<span onClick={postDelete}>
							<i
								className="fa fa-trash icon-style delete-color"
								aria-hidden="true"
							></i>
						</span>,
					]}
				>
					<Meta
						avatar={
							<Avatar
								style={{
									backgroundColor: "#534edf",
								}}
							>{`${data.users.userName?.split("")[0].toUpperCase()}`}</Avatar>
						}
						title={data.users.userName}
						description={data.description}
					/>
				</Card>
			) : (
				<Card
					key={data._id}
					cover={
						data.image ? (
							<Image
								className="image"
								src={`https://skillmedia-server.herokuapp.com${data.image}`}
							/>
						) : (
							""
						)
					}
					actions={[
						<span onClick={likePost}>
							{liked() ? (
								<i
									className="fa fa-thumbs-up icon-style"
									aria-hidden="true"
								></i>
							) : (
								<i
									className="fa fa-thumbs-o-up icon-style"
									aria-hidden="true"
								></i>
							)}
							<span className="post-info">{data.likes.length}</span>
						</span>,
						<span onClick={handleAddComment}>
							<i
								className="fa fa-comments-o icon-style"
								title="Add comment"
								aria-hidden="true"
							></i>
							<span className="post-info">{data.comments.length}</span>
						</span>,
					]}
				>
					<Meta
						avatar={
							<Avatar
								style={{
									backgroundColor: "#534edf",
								}}
							>{`${data.users.userName?.split("")[0].toUpperCase()}`}</Avatar>
						}
						title={data.users.userName}
						description={data.description}
					/>
				</Card>
			)}
		</div>
	);
}
