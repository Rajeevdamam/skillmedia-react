import { Card, Empty, Tag, Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addComment, getPostDetails } from "../../services/services";
import { Image } from "antd";
import CommentComponent from "../commentComponent/commentComponent";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./addComment.css";
import { Avatar } from "@material-ui/core";
interface Props {}
interface params {
	postid: any;
}

export default function AddCommentComponent({}: Props) {
	const { Meta } = Card;
	const { postid } = useParams<params>();

	const [comment, setcomment] = useState<any>({
		comment: "",
		post: "",
	});
	const dispatch = useDispatch();
	const { searchedPost, commentLength, commentLikeLength } = useSelector(
		(state: any) => state.posts
	);

	const commentInput = (e: any) => {
		setcomment({ comment: e.target.value, post: postid });
	};

	const commentSubmit = async () => {
		try {
			let res = await addComment(comment);
			dispatch(res);
			setcomment({ comment: "", post: postid });
			toast.info("Comment added successfully", {
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
			toast.error("Something went wrong", {
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

	useEffect(() => {
		getPostDetails(postid)
			.then((res) => {
				dispatch(res);
			})
			.catch((err) => console.log(err));
	}, [commentLength, commentLikeLength]);

	return (
		<div>
			<ToastContainer />
			{searchedPost !== null ? (
				<div className="comment-body">
					<div className="conatiner">
						<div className="row">
							<div className="col-sm-6 post-div">
								<div className=" post-image-section">
									{searchedPost.image !== "" ? (
										<Image
											className="image"
											src={`https://skillmedia-server.herokuapp.com${searchedPost.image}`}
										/>
									) : (
										<Empty
											image={Empty.PRESENTED_IMAGE_SIMPLE}
											description={
												<span className="no-comments">No Image</span>
											}
										/>
									)}
								</div>
								<div className="tags-div">
									<Divider className="divider" orientation="left">
										Tags
									</Divider>
									{searchedPost.tags.map((tag: any) => {
										return (
											<Tag color="#534edf" className="tags">
												{tag}
											</Tag>
										);
									})}
								</div>
							</div>
							<div className="col-sm-6 post-details">
								<Card className="post-owner">
									<Meta
										avatar={
											<Avatar
												style={{
													backgroundColor: "#534edf",
													float: "right",
													cursor: "pointer",
												}}
											>{`${searchedPost.users.userName
												.split("")[0]
												.toUpperCase()}`}</Avatar>
										}
										title={searchedPost.users.userName}
										description={searchedPost.description}
									/>
									<div className="d-flex justify-content-end">
										<div className="likes">
											<i
												className="fa fa-thumbs-up color"
												aria-disabled="true"
												aria-hidden="true"
											></i>
											<span className="likes-comments-count color">
												{searchedPost.likes.length}
											</span>
										</div>
										<div className="comments">
											<i
												className="fa fa-comments color"
												aria-hidden="true"
											></i>

											<span className="likes-comments-count color">
												{searchedPost.comments.length}
											</span>
										</div>
									</div>
								</Card>
								<div className="comment-section">
									<div className="add-comment">
										<div>
											<input
												type="text"
												placeholder=" Add a Comment..."
												className="input-comment"
												onChange={commentInput}
												value={comment.comment}
											></input>
										</div>
										<div className="post-comment-icon" onClick={commentSubmit}>
											<i
												className="fa fa-paper-plane positioning"
												aria-hidden="true"
											></i>
										</div>
									</div>
									{searchedPost.comments.length !== 0 ? (
										searchedPost.comments.map((comment: any) => {
											return (
												<CommentComponent comment={comment}></CommentComponent>
											);
										})
									) : (
										<Empty
											image={Empty.PRESENTED_IMAGE_SIMPLE}
											description={
												<span className="no-comments">No Comments yet</span>
											}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
